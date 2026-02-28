# LunaTV 前端项目 - 快速开始

## 项目已创建完成!

LunaTV 前端项目已成功创建,完全适配 LunaTV 后端 API,适合使用 HBuilderX 进行开发和调试。

## 项目位置

```
/workspace/LunaTV-Frontend
```

## 项目结构

```
LunaTV-Frontend/
├── pages/                  # 6个页面
│   ├── index/             # 首页
│   ├── search/            # 搜索页
│   ├── detail/            # 详情页
│   ├── player/            # 播放器
│   ├── favorites/         # 收藏页
│   └── category/          # 分类页
├── src/
│   ├── api/              # API 接口 (video.js)
│   ├── config/           # 配置文件 (api.js)
│   ├── stores/           # 3个 Pinia Store
│   └── utils/            # 工具函数 (request.js)
├── static/               # 静态资源
├── App.vue              # 应用入口
├── main.js              # 主入口
├── pages.json           # 页面配置
├── manifest.json        # 应用配置
├── vite.config.js       # Vite 配置
├── package.json         # 依赖配置
└── README.md            # 项目说明
```

## 快速开始

### 步骤 1: 进入项目目录
```bash
cd /workspace/LunaTV-Frontend
```

### 步骤 2: 安装依赖
```bash
npm install
```

### 步骤 3: 配置后端 API

编辑 `src/config/api.js` 文件:

```javascript
const apiConfig = {
  baseURL: 'http://your-lunatv-backend:3000/api',  // 修改为你的后端地址
  timeout: 30000
}
```

### 步骤 4: 运行项目

#### 使用 HBuilderX (推荐)
1. 打开 HBuilderX
2. 点击 "文件" -> "导入" -> "从本地目录导入"
3. 选择 `/workspace/LunaTV-Frontend` 目录
4. 点击 "运行" -> "运行到浏览器"

#### 使用命令行
```bash
npm run dev:h5
```

项目将在 `http://localhost:8080` 运行。

## 主要功能

- 首页轮播推荐
- 多源视频搜索
- 视频详情查看
- 在线视频播放
- 收藏管理
- 分类浏览

## API 对接

项目已完美对接 LunaTV 后端 API:

- `GET /api/search` - 视频搜索
- `GET /api/detail` - 获取视频详情
- `GET /api/douban/details` - 获取豆瓣详情
- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites` - 添加收藏
- `DELETE /api/favorites/{id}` - 删除收藏

## 电视端适配

项目已针对电视端优化:
- 大屏幕适配
- 遥控器导航支持
- 流畅的动画效果
- 深色主题设计

## 多端支持

- H5 网页版
- 微信小程序
- 原生 APP (Android/iOS)
- 电视端

## 文档说明

- **README.md** - 项目说明和快速开始
- **HBuilderX_GUIDE.md** - HBuilderX 使用指南
- **API_INTEGRATION.md** - API 对接详细说明
- **DEPLOYMENT.md** - 部署指南
- **PROJECT_OVERVIEW.md** - 项目概览
- **PROJECT.md** - 项目总结

## 下一步

1. 确保后端服务已启动
2. 安装依赖: `npm install`
3. 配置后端 API 地址
4. 运行项目进行测试
5. 在 HBuilderX 中进行开发调试

## 技术支持

如需帮助,请查看:
- HBuilderX 使用: `HBuilderX_GUIDE.md`
- API 对接: `API_INTEGRATION.md`
- 部署指南: `DEPLOYMENT.md`

---

**项目版本**: 1.0.0
**创建时间**: 2026-02-28
**技术栈**: uni-app + Vue 3 + Pinia
