# LunaTV 电视前端项目

## 项目简介

这是一个基于 uni-app 框架开发的电视端影视应用前端,完美适配 LunaTV 后端 API。项目使用 Vue 3 + Pinia 构建,支持多端运行,特别适合使用 HBuilderX 进行开发和调试。

## 技术栈

- **框架**: uni-app (Vue 3)
- **状态管理**: Pinia
- **UI 组件**: uni-ui
- **HTTP 客户端**: Axios
- **样式**: SCSS
- **构建工具**: Vite

## 功能特性

### 核心功能
- 首页轮播推荐
- 多源视频搜索
- 视频详情查看
- 在线视频播放
- 收藏管理
- 分类浏览

### 电视端优化
- 大屏幕适配
- 遥控器导航支持
- 流畅的动画效果
- 深色主题设计

## 项目结构

```
LunaTV-Frontend/
├── pages/                  # 页面
│   ├── index/              # 首页
│   ├── search/             # 搜索页
│   ├── detail/             # 详情页
│   ├── player/             # 播放器
│   ├── favorites/          # 收藏页
│   └── category/           # 分类页
├── src/
│   ├── api/                # API 接口
│   ├── config/             # 配置文件
│   ├── stores/             # Pinia 状态管理
│   └── utils/              # 工具函数
├── static/                 # 静态资源
│   ├── styles/             # 全局样式
│   └── tabbar/             # 底部导航图标
├── App.vue                 # 应用入口
├── main.js                 # 主入口文件
├── pages.json              # 页面配置
├── package.json            # 项目配置
└── vite.config.js          # Vite 配置
```

## 开发环境搭建

### 1. 安装 HBuilderX

下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)

### 2. 导入项目

1. 打开 HBuilderX
2. 点击 "文件" -> "导入" -> "从本地目录导入"
3. 选择项目根目录

### 3. 安装依赖

在 HBuilderX 终端中执行:
```bash
npm install
```

### 4. 配置后端 API

修改 `src/config/api.js` 文件,配置后端 API 地址:
```javascript
const apiConfig = {
  baseURL: process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://your-lunatv-domain.com/api',
  timeout: 30000
}
```

### 5. 启动开发服务器

#### H5 开发
1. 在 HBuilderX 中点击 "运行" -> "运行到浏览器"
2. 或在终端执行:
```bash
npm run dev:h5
```

#### 微信小程序开发
1. 在 HBuilderX 中点击 "运行" -> "运行到小程序模拟器" -> "微信开发者工具"
2. 或在终端执行:
```bash
npm run dev:mp-weixin
```

#### APP 开发
1. 在 HBuilderX 中点击 "运行" -> "运行到手机或模拟器"
2. 选择目标设备

### 6. 代理配置

开发环境中,Vite 已配置代理,将 `/api` 请求转发到 LunaTV 后端 (默认 http://localhost:3000)

可在 `vite.config.js` 中修改代理配置:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

## API 适配说明

项目已完美适配以下 LunaTV 后端 API:

### 搜索 API
- `GET /api/search?q={keyword}` - 视频搜索

### 详情 API
- `GET /api/detail?id={id}&source={source}` - 获取视频详情
- `GET /api/douban/details?id={id}` - 获取豆瓣详情

### 分类 API
- `GET /api/source-browser/categories` - 获取分类列表
- `GET /api/source-browser/list` - 获取源列表

### 收藏 API
- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites` - 添加收藏
- `DELETE /api/favorites/{id}` - 删除收藏

## 状态管理

### User Store (用户状态)
```javascript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
userStore.setToken('your-token')
userStore.setUsername('username')
userStore.logout()
```

### Video Store (视频状态)
```javascript
import { useVideoStore } from '@/stores/video'

const videoStore = useVideoStore()
await videoStore.performSearch('keyword')
await videoStore.fetchVideoDetail(id, source)
videoStore.setCurrentVideo(video)
```

### Favorite Store (收藏状态)
```javascript
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
await favoriteStore.fetchFavorites()
await favoriteStore.addToFavorite(videoData)
await favoriteStore.removeFromFavorite(id)
```

## 构建打包

### H5 打包
```bash
npm run build:h5
```

### 微信小程序打包
```bash
npm run build:mp-weixin
```

### APP 打包
1. 在 HBuilderX 中点击 "发行" -> "原生App-云打包"
2. 选择证书和打包参数
3. 点击打包

## 电视端适配说明

### 遥控器导航
- 方向键: 上下左右导航
- 确定键: 选中/播放
- 返回键: 返回上一页

### 焦点管理
所有可交互元素都已实现焦点管理,确保电视端操作流畅。

### 大屏幕适配
使用 rpx 单位实现响应式布局,适配不同尺寸电视屏幕。

## 注意事项

1. **跨域问题**: 生产环境需要配置后端 CORS 或使用代理
2. **Token 认证**: 部分接口需要登录认证,确保 Token 正确配置
3. **视频格式**: 确保视频源格式支持 (MP4/HLS)
4. **性能优化**: 大量数据时建议使用虚拟滚动

## 开发建议

1. 使用 HBuilderX 的真机调试功能进行电视端测试
2. 关注网络请求性能,优化加载速度
3. 遵循 uni-app 开发规范,确保多端兼容性

## 常见问题

### Q: HBuilderX 运行报错?
A: 检查 Node.js 版本 (推荐 >= 16),重新安装依赖

### Q: API 请求失败?
A: 检查后端服务是否启动,确认 API 地址配置正确

### Q: 视频无法播放?
A: 检查视频源格式,确认 URL 可访问

### Q: 电视端无法导航?
A: 确保所有交互元素都有焦点样式,检查事件绑定

## 许可证

本项目采用 CC BY-NC-SA 4.0 协议

## 联系方式

如有问题,请提交 Issue 或 Pull Request
