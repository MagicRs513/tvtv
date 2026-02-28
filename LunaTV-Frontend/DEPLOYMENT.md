# LunaTV 前端部署指南

本文档详细介绍 LunaTV 前端项目的部署方案。

## 部署前准备

### 1. 环境检查
- Node.js >= 16.0.0
- npm >= 8.0.0
- HBuilderX >= 3.8.0 (如使用 HBuilderX 部署)

### 2. 配置修改
修改生产环境配置文件 `.env.production`:
```bash
NODE_ENV=production
VITE_API_BASE_URL=https://your-lunatv-domain.com
VITE_APP_NAME=LunaTV
VITE_APP_VERSION=1.0.0
```

## H5 部署方案

### 方案一: Nginx 部署 (推荐)

#### 1. 构建项目
在项目根目录执行:
```bash
npm run build:h5
```

构建产物位于 `unpackage/dist/build/h5` 目录。

#### 2. 服务器准备
```bash
# 安装 Nginx
sudo apt-get install nginx  # Ubuntu/Debian
# 或
sudo yum install nginx      # CentOS/RHEL

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 3. 配置 Nginx
创建 Nginx 配置文件 `/etc/nginx/sites-available/lunatv`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    root /var/www/lunatv;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理到后端
    location /api {
        proxy_pass http://localhost:3000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
}
```

#### 4. 部署文件
```bash
# 创建部署目录
sudo mkdir -p /var/www/lunatv

# 复制文件
sudo cp -r unpackage/dist/build/h5/* /var/www/lunatv/

# 设置权限
sudo chown -R www-data:www-data /var/www/lunatv
sudo chmod -R 755 /var/www/lunatv
```

#### 5. 启用配置
```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/lunatv /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 6. 配置 HTTPS (可选但推荐)
```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

---

### 方案二: Vercel 部署

#### 1. 准备工作
- 注册 [Vercel](https://vercel.com) 账号
- 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 2. 构建配置
在 `vercel.json` 中配置:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-lunatv-domain.com/api/:path*"
    }
  ]
}
```

#### 3. 部署
```bash
# 登录 Vercel
vercel login

# 部署
vercel --prod
```

---

### 方案三: Docker 部署

#### 1. 创建 Dockerfile
```dockerfile
# 第一阶段: 构建
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:h5

# 第二阶段: 运行
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/unpackage/dist/build/h5 /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 创建 nginx.conf
```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        root   /usr/share/nginx/html;
        index  index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://lunatv-backend:3000/api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```

#### 3. 构建和运行
```bash
# 构建镜像
docker build -t lunatv-frontend .

# 运行容器
docker run -d -p 80:80 --name lunatv-frontend lunatv-frontend

# 使用 Docker Compose
docker-compose up -d
```

#### 4. Docker Compose 配置
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - lunatv-network

  backend:
    image: your-lunatv-backend-image
    ports:
      - "3000:3000"
    networks:
      - lunatv-network

networks:
  lunatv-network:
    driver: bridge
```

---

## 微信小程序部署

### 1. 凄备工作
- 注册微信小程序账号
- 获取 AppID

### 2. 构建项目
```bash
npm run build:mp-weixin
```

构建产物位于 `unpackage/dist/build/mp-weixin` 目录。

### 3. 配置 manifest.json
确保 `manifest.json` 中配置了正确的 `appid`:
```json
{
  "mp-weixin": {
    "appid": "your-appid",
    "setting": {
      "urlCheck": false
    }
  }
}
```

### 4. 使用微信开发者工具
1. 打开微信开发者工具
2. 导入项目,选择 `unpackage/dist/build/mp-weixin` 目录
3. 填写 AppID 和项目名称
4. 点击 "上传" 按钮
5. 在微信公众平台提交审核

### 5. 注意事项
- 微信小程序有较多 API 限制,需要使用小程序专属 API
- 某些功能可能需要使用小程序云开发
- 注意小程序包大小限制 (2MB)

---

## APP 部署

### 1. Android 部署

#### 使用 HBuilderX 云打包
1. 在 HBuilderX 中点击 "发行" -> "原生App-云打包"
2. 选择平台为 "Android"
3. 配置应用信息:
   - 应用名称
   - 应用包名
   - 版本号
   - 应用图标
4. 选择证书:
   - 使用 DCloud 公共证书 (测试用)
   - 使用自有证书 (正式发布)
5. 点击 "打包"
6. 等待打包完成,下载 APK 文件
7. 安装到设备或发布到应用商店

#### 使用自有证书
```bash
# 生成证书
keytool -genkey -alias lunatv -keyalg RSA -keysize 2048 -validity 36500 -keystore lunatv.keystore

# 在打包时使用
# 别名: lunatv
# 密钥库文件: lunatv.keystore
```

#### 发布到应用商店
1. 准备应用截图和描述
2. 在应用商店开发者后台创建应用
3. 上传 APK 文件
4. 填写应用信息
5. 提交审核

---

### 2. iOS 部署

#### 准备工作
- Mac 电脑
- Xcode
- Apple 开发者账号 (99美元/年)

#### 使用 HBuilderX 云打包
1. 点击 "发行" -> "原生App-云打包"
2. 选择平台为 "iOS"
3. 配置应用信息:
   - 应用名称
   - Bundle ID
   - 版本号
4. 上传证书和描述文件
5. 点击 "打包"
6. 下载 IPA 文件
7. 使用 Xcode 或 TestFlight 安装

#### 本地打包
1. 导出 Xcode 项目
2. 在 Xcode 中打开项目
3. 配置签名和证书
4. 连接 iOS 设备
5. 点击运行

#### 发布到 App Store
1. 在 App Store Connect 创建应用
2. 上传 IPA 文件
3. 填写应用信息
4. 提交审核

---

## 电视端部署

### 1. Web 方式部署
电视端可以使用 H5 版本,通过以下方式部署:

#### Android TV
1. 构建为 H5 应用
2. 打包为 APK (参考 Android 部署)
3. 适配电视端遥控器操作
4. 提交到 Google Play

#### 酷开系统 (创维)
1. 构建为 H5 应用
2. 遵循酷开开发规范
3. 提交到酷开应用市场

#### 当贝市场
1. 构建为 H5 应用
2. 使用当贝 SDK 适配
3. 提交到当贝市场

### 2. 原生 APP 方式
参考 APP 部署章节,但需要注意:
- 适配大屏幕分辨率
- 支持遥控器操作
- 优化电视端交互体验

---

## CI/CD 自动部署

### GitHub Actions

创建 `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build:h5
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}

    - name: Deploy to server
      uses: easingthemes/ssh-deploy@v2
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        ARGS: "-rlgoDzvc -i"
        SOURCE: "unpackage/dist/build/h5/"
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: "/var/www/lunatv"
```

### GitLab CI

创建 `.gitlab-ci.yml`:
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build:h5
  artifacts:
    paths:
      - unpackage/dist/build/h5/

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - scp -r unpackage/dist/build/h5/* $SSH_USER@$SSH_HOST:/var/www/lunatv/
  only:
    - main
```

---

## 监控和日志

### 性能监控
使用 Google Analytics 或百度统计:
```javascript
// 在 main.js 中配置
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 配置统计代码
app.mount('#app')
```

### 错误监控
使用 Sentry:
```javascript
import * as Sentry from "@sentry/vue"

Sentry.init({
  dsn: "your-dsn",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
})
```

### 日志收集
服务端日志:
```bash
# Nginx 访问日志
tail -f /var/log/nginx/access.log

# Nginx 错误日志
tail -f /var/log/nginx/error.log
```

---

## 备份和恢复

### 备份
```bash
# 备份静态文件
tar -czf lunatv-frontend-$(date +%Y%m%d).tar.gz /var/www/lunatv

# 备份 Nginx 配置
cp /etc/nginx/sites-available/lunatv /backup/lunatv.conf
```

### 恢复
```bash
# 解压备份
tar -xzf lunatv-frontend-20240101.tar.gz -C /var/www/

# 重启 Nginx
sudo systemctl restart nginx
```

---

## 常见问题

### Q: 部署后白屏?
A: 检查:
1. 静态资源路径是否正确
2. API 地址是否配置正确
3. 是否存在跨域问题
4. 浏览器控制台是否有错误

### Q: 路由刷新 404?
A: Nginx 需要配置 `try_files $uri $uri/ /index.html;`

### Q: API 请求失败?
A: 检查:
1. 后端服务是否运行
2. Nginx 代理配置是否正确
3. CORS 是否配置正确
4. 是否存在防火墙限制

### Q: 性能优化建议?
A:
1. 启用 Gzip 压缩
2. 配置 CDN 加速
3. 使用图片懒加载
4. 开启浏览器缓存

---

## 安全建议

1. **HTTPS**: 生产环境务必使用 HTTPS
2. **安全头**: 配置安全响应头
3. **CORS**: 严格配置 CORS 策略
4. **防爬**: 添加反爬虫措施
5. **定期更新**: 及时更新依赖和系统
6. **备份**: 定期备份数据和配置
