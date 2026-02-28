# LunaTV 前端项目概览

## 项目简介

LunaTV 前端是一个基于 uni-app 框架开发的影视聚合播放应用,完美适配 LunaTV 后端 API。项目采用 Vue 3 + Pinia 构建,支持 H5、微信小程序、APP 等多端运行,特别适合使用 HBuilderX 进行开发和调试。

## 核心特性

### 多端支持
- H5 网页版
- 微信小程序
- 原生 APP (Android/iOS)
- 电视端优化

### 主要功能
- 首页轮播推荐
- 多源视频搜索
- 视频详情查看
- 在线视频播放
- 收藏管理
- 分类浏览

### 技术亮点
- Vue 3 Composition API
- Pinia 状态管理
- TypeScript 支持
- SCSS 样式预处理
- Vite 构建工具
- 完善的错误处理

## 技术架构

### 技术栈
```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│  (Pages, Components, Views)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          State Management           │
│         (Pinia Stores)               │
│  - User Store                       │
│  - Video Store                      │
│  - Favorite Store                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           API Layer                 │
│      (Axios Interceptors)           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Network Layer               │
│    (HTTP Requests + Proxy)          │
└─────────────────────────────────────┘
```

### 项目结构
```
LunaTV-Frontend/
├── pages/                      # 页面
│   ├── index/                  # 首页
│   ├── search/                 # 搜索页
│   ├── detail/                 # 详情页
│   ├── player/                 # 播放器
│   ├── favorites/              # 收藏页
│   └── category/               # 分类页
├── src/
│   ├── api/                    # API 接口
│   │   └── video.js           # 视频相关 API
│   ├── config/                 # 配置文件
│   │   └── api.js             # API 配置
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.js            # 用户状态
│   │   ├── video.js           # 视频状态
│   │   └── favorite.js        # 收藏状态
│   └── utils/                  # 工具函数
│       └── request.js         # Axios 封装
├── static/                     # 静态资源
│   ├── styles/                 # 全局样式
│   │   └── global.scss       # 全局样式
│   └── tabbar/                 # 底部导航图标
├── App.vue                     # 应用入口
├── main.js                     # 主入口文件
├── pages.json                  # 页面配置
├── manifest.json               # 应用配置
├── package.json                # 项目配置
└── vite.config.js              # Vite 配置
```

## 核心模块说明

### 1. 状态管理 (Pinia Stores)

#### User Store
管理用户登录状态和认证信息。
```javascript
const userStore = useUserStore()
userStore.setToken('token')
userStore.setUsername('username')
userStore.logout()
```

#### Video Store
管理视频搜索、详情等数据。
```javascript
const videoStore = useVideoStore()
await videoStore.performSearch('keyword')
await videoStore.fetchVideoDetail(id, source)
```

#### Favorite Store
管理用户收藏数据。
```javascript
const favoriteStore = useFavoriteStore()
await favoriteStore.fetchFavorites()
await favoriteStore.addToFavorite(video)
```

### 2. API 接口层

统一的 API 调用封装,包含:
- 搜索接口
- 详情接口
- 豆瓣接口
- 收藏接口
- 分类接口

所有接口都经过 Axios 拦截器处理,统一处理:
- 请求拦截: 添加 Token
- 响应拦截: 错误处理

### 3. 页面组件

#### 首页 (pages/index)
- 轮播图展示
- 快捷入口
- 推荐列表
- 分类导航

#### 搜索页 (pages/search)
- 搜索输入
- 搜索结果展示
- 结果筛选

#### 详情页 (pages/detail)
- 视频信息展示
- 播放列表
- 收藏功能

#### 播放器 (pages/player)
- 视频播放
- 播放控制
- 集数切换

#### 收藏页 (pages/favorites)
- 收藏列表
- 删除收藏
- 视频跳转

#### 分类页 (pages/category)
- 分类列表
- 分类浏览

## API 对接详情

### 已适配的 LunaTV API

1. **搜索 API** - `GET /api/search`
   - 多源搜索
   - 智能变体
   - 成人内容过滤

2. **详情 API** - `GET /api/detail`
   - 视频详情
   - 播放列表
   - 实时更新

3. **豆瓣 API** - `GET /api/douban/details`
   - 豆瓣信息
   - 演员信息
   - 推荐影片

4. **分类 API** - `GET /api/source-browser/categories`
   - 分类列表
   - 分类统计

5. **收藏 API**
   - `GET /api/favorites` - 获取收藏
   - `POST /api/favorites` - 添加收藏
   - `DELETE /api/favorites/{id}` - 删除收藏

### 数据映射

后端数据到前端数据的完整映射,详见 `API_INTEGRATION.md`。

## 电视端适配

### 适配要点
1. **大屏幕适配**: 使用 rpx 单位,响应式布局
2. **遥控器导航**: 焦点管理,方向键支持
3. **性能优化**: 虚拟滚动,图片懒加载
4. **交互优化**: 流畅动画,快捷操作

### 焦点管理
所有可交互元素都已实现焦点管理:
- 上下左右导航
- 确定/返回键支持
- 焦点样式优化

## 开发指南

### 快速开始
```bash
# 1. 安装依赖
npm install

# 2. 配置 API 地址
# 编辑 .env.development 文件

# 3. 运行开发服务器
npm run dev:h5
```

### HBuilderX 使用
1. 导入项目
2. 运行到浏览器
3. 真机调试
4. 发布打包

详见 `HBuilderX_GUIDE.md`。

## 部署方案

### 支持的部署方式
1. **Nginx 部署** (推荐)
2. **Vercel 部署**
3. **Docker 部署**
4. **微信小程序**
5. **原生 APP**

### 部署文档
详见 `DEPLOYMENT.md`。

## 性能优化

### 已实现的优化
1. **代码分割**: 按需加载页面
2. **图片优化**: CDN + 压缩
3. **缓存策略**: 多层缓存
4. **虚拟滚动**: 大列表优化
5. **Gzip 压缩**: 传输优化

### 性能指标
- 首屏加载: < 2s
- 交互响应: < 100ms
- 页面大小: < 500KB (gzipped)

## 安全性

### 安全措施
1. **HTTPS**: 强制使用 HTTPS
2. **CORS**: 严格的跨域策略
3. **Token**: 安全的认证机制
4. **XSS**: 输入过滤和转义
5. **CSRF**: CSRF Token 保护

## 监控和日志

### 监控指标
- 页面访问量
- API 调用统计
- 错误率
- 性能指标

### 日志系统
- 前端错误日志
- 用户行为日志
- 性能日志

## 常见问题

### 开发相关
Q: 如何配置 API 地址?
A: 修改 `src/config/api.js` 文件。

Q: 如何添加新页面?
A: 在 `pages/` 目录创建页面,在 `pages.json` 中配置路由。

Q: 如何调试?
A: 使用 Chrome DevTools 或 HBuilderX 调试器。

### 部署相关
Q: 如何部署到生产环境?
A: 参考 `DEPLOYMENT.md` 文档。

Q: 如何配置 HTTPS?
A: 使用 Certbot 获取免费 SSL 证书。

Q: 如何优化性能?
A: 启用 Gzip、使用 CDN、优化图片。

## 未来计划

### 短期目标
- 添加更多播放器功能
- 优化电视端体验
- 添加下载功能
- 完善用户系统

### 长期目标
- 支持更多平台
- AI 智能推荐
- 社交功能
- 多语言支持

## 贡献指南

欢迎贡献代码、报告 Bug 或提出建议。

### 提交规范
- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建/工具链

### 开发流程
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 CC BY-NC-SA 4.0 协议。

## 联系方式

- 问题反馈: GitHub Issues
- 技术讨论: GitHub Discussions

## 相关资源

- [LunaTV 后端](https://github.com/lumi210/LunaTV)
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [HBuilderX 官方文档](https://hx.dcloud.net.cn/)

---

**项目版本**: 1.0.0
**最后更新**: 2024-01-01
**维护者**: LunaTV Team
