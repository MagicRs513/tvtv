# LunaTV 后端 API 对接说明

本文档详细说明 LunaTV 前端如何完美适配 LunaTV 后端 API。

## API 基础配置

### 基础 URL
```javascript
// 开发环境
baseURL: 'http://localhost:3000/api'

// 生产环境
baseURL: 'https://your-lunatv-domain.com/api'
```

### 认证方式
大部分接口使用 Cookie 认证,部分接口需要 Token:

```javascript
// Cookie 认证 (自动携带)
headers: {
  'Cookie': 'your-session-cookie'
}

// Token 认证
headers: {
  'Authorization': 'Bearer your-token'
}
```

## API 接口清单

### 1. 搜索接口

#### 接口信息
- **路径**: `GET /api/search`
- **认证**: 需要登录 (Cookie)
- **参数**:
  - `q`: 搜索关键词 (必填)

#### 请求示例
```javascript
GET /api/search?q=复仇者联盟
```

#### 响应示例
```json
{
  "results": [
    {
      "vod_id": "12345",
      "vod_name": "复仇者联盟",
      "vod_pic": "https://example.com/poster.jpg",
      "vod_year": "2012",
      "vod_remarks": "HD",
      "vod_source_from": "example",
      "vod_director": "乔斯·韦登",
      "vod_actor": "小罗伯特·唐尼,克里斯·埃文斯",
      "vod_class": "科幻,动作"
    }
  ]
}
```

#### 前端对接
```javascript
import { searchVideo } from '@/api/video'

const results = await searchVideo('复仇者联盟')
console.log(results.results)
```

---

### 2. 视频详情接口

#### 接口信息
- **路径**: `GET /api/detail`
- **认证**: 需要登录 (Cookie)
- **参数**:
  - `id`: 视频 ID (必填)
  - `source`: 来源标识 (必填)

#### 请求示例
```javascript
GET /api/detail?id=12345&source=example
```

#### 响应示例
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "vod_id": "12345",
    "vod_name": "复仇者联盟",
    "playList": [
      {
        "name": "第1集",
        "url": "https://example.com/video.m3u8"
      },
      {
        "name": "第2集",
        "url": "https://example.com/video2.m3u8"
      }
    ]
  }
}
```

#### 前端对接
```javascript
import { getVideoDetail } from '@/api/video'

const detail = await getVideoDetail('12345', 'example')
console.log(detail.data.playList)
```

---

### 3. 豆瓣详情接口

#### 接口信息
- **路径**: `GET /api/douban/details`
- **认证**: 无需认证
- **参数**:
  - `id`: 豆瓣 ID (必填)
  - `nocache`: 是否跳过缓存 (可选,值为 "1")

#### 请求示例
```javascript
GET /api/douban/details?id=1292052
```

#### 响应示例
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "1292052",
    "title": "复仇者联盟",
    "poster": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p21572.jpg",
    "rate": "8.0",
    "year": "2012",
    "directors": ["乔斯·韦登"],
    "screenwriters": [],
    "cast": ["小罗伯特·唐尼", "克里斯·埃文斯"],
    "genres": ["科幻", "动作"],
    "countries": ["美国"],
    "languages": ["英语"],
    "first_aired": "2012-05-04(中国大陆)",
    "plot_summary": "地球突然遭到...",
    "celebrities": [
      {
        "id": "1054521",
        "name": "小罗伯特·唐尼",
        "avatar": "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p15025.jpg",
        "role": "钢铁侠",
        "avatars": {
          "small": "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p15025.jpg",
          "medium": "https://img1.doubanio.com/view/celebrity/m_ratio_celebrity/public/p15025.jpg",
          "large": "https://img1.doubanio.com/view/celebrity/l_ratio_celebrity/public/p15025.jpg"
        }
      }
    ],
    "recommendations": [
      {
        "id": "1292063",
        "title": "复仇者联盟2",
        "poster": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p22290.jpg",
        "rate": "7.3"
      }
    ],
    "backdrop": "https://img1.doubanio.com/view/photo/l/public/p21572.jpg",
    "trailerUrl": "https://example.com/trailer.mp4"
  }
}
```

#### 前端对接
```javascript
import { getDoubanDetail } from '@/api/video'

const doubanDetail = await getDoubanDetail('1292052')
console.log(doubanDetail.data)
```

---

### 4. 分类列表接口

#### 接口信息
- **路径**: `GET /api/source-browser/categories`
- **认证**: 需要登录 (Cookie)
- **参数**: 无

#### 请求示例
```javascript
GET /api/source-browser/categories
```

#### 响应示例
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "电影",
      "type": "movie",
      "count": 1234
    },
    {
      "id": 2,
      "name": "电视剧",
      "type": "tv",
      "count": 5678
    }
  ]
}
```

#### 前端对接
```javascript
import { getCategories } from '@/api/video'

const categories = await getCategories()
console.log(categories.data)
```

---

### 5. 源列表接口

#### 接口信息
- **路径**: `GET /api/source-browser/list`
- **认证**: 需要登录 (Cookie)
- **参数**: 无

#### 请求示例
```javascript
GET /api/source-browser/list
```

#### 响应示例
```json
{
  "code": 200,
  "data": [
    {
      "key": "example",
      "name": "示例源",
      "url": "https://example.com/api",
      "status": "active",
      "weight": 100
    }
  ]
}
```

#### 前端对接
```javascript
import { getSourceList } from '@/api/video'

const sources = await getSourceList()
console.log(sources.data)
```

---

### 6. 收藏列表接口

#### 接口信息
- **路径**: `GET /api/favorites`
- **认证**: 需要登录 (Cookie)
- **参数**:
  - `type`: 类型筛选 (可选)
  - `page`: 页码 (可选,默认 1)
  - `limit`: 每页数量 (可选,默认 20)

#### 请求示例
```javascript
GET /api/favorites?type=movie&page=1&limit=20
```

#### 响应示例
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "video_id": "12345",
      "video_name": "复仇者联盟",
      "video_pic": "https://example.com/poster.jpg",
      "video_source_from": "example",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
```

#### 前端对接
```javascript
import { getFavorites } from '@/api/video'

const favorites = await getFavorites({ type: 'movie', page: 1, limit: 20 })
console.log(favorites.data)
```

---

### 7. 添加收藏接口

#### 接口信息
- **路径**: `POST /api/favorites`
- **认证**: 需要登录 (Cookie)
- **参数** (Body):
  - `video_id`: 视频 ID (必填)
  - `video_name`: 视频名称 (必填)
  - `video_pic`: 视频海报 (必填)
  - `video_source_from`: 视频来源 (必填)

#### 请求示例
```javascript
POST /api/favorites
Content-Type: application/json

{
  "video_id": "12345",
  "video_name": "复仇者联盟",
  "video_pic": "https://example.com/poster.jpg",
  "video_source_from": "example"
}
```

#### 响应示例
```json
{
  "code": 200,
  "message": "收藏成功"
}
```

#### 前端对接
```javascript
import { addFavorite } from '@/api/video'

await addFavorite({
  video_id: '12345',
  video_name: '复仇者联盟',
  video_pic: 'https://example.com/poster.jpg',
  video_source_from: 'example'
})
```

---

### 8. 删除收藏接口

#### 接口信息
- **路径**: `DELETE /api/favorites/{id}`
- **认证**: 需要登录 (Cookie)
- **参数**:
  - `id`: 收藏 ID (路径参数)

#### 请求示例
```javascript
DELETE /api/favorites/1
```

#### 响应示例
```json
{
  "code": 200,
  "message": "删除成功"
}
```

#### 前端对接
```javascript
import { removeFavorite } from '@/api/video'

await removeFavorite(1)
```

---

## 错误处理

### 错误码说明
- `200`: 成功
- `400`: 请求参数错误
- `401`: 未授权 (未登录)
- `403`: 禁止访问
- `404`: 资源不存在
- `429`: 请求过于频繁
- `500`: 服务器错误
- `502`: 网关错误
- `504`: 网关超时

### 错误响应格式
```json
{
  "error": "错误信息",
  "code": 400,
  "details": "详细错误描述"
}
```

### 前端错误处理
```javascript
try {
  const result = await searchVideo('keyword')
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        uni.showToast({ title: '未授权', icon: 'none' })
        break
      case 404:
        uni.showToast({ title: '资源不存在', icon: 'none' })
        break
      case 500:
        uni.showToast({ title: '服务器错误', icon: 'none' })
        break
    }
  }
}
```

---

## 数据映射

### 搜索结果数据映射
```javascript
{
  vod_id: '视频 ID',
  vod_name: '视频名称',
  vod_pic: '海报地址',
  vod_year: '年份',
  vod_remarks: '备注 (集数/清晰度)',
  vod_source_from: '来源',
  vod_director: '导演',
  vod_actor: '主演',
  vod_class: '类型'
}
```

### 视频详情数据映射
```javascript
{
  vod_id: '视频 ID',
  vod_name: '视频名称',
  vod_pic: '海报地址',
  vod_year: '年份',
  vod_remarks: '备注',
  vod_source_from: '来源',
  vod_director: '导演',
  vod_actor: '主演',
  vod_class: '类型',
  vod_content: '剧情简介',
  playList: [
    {
      name: '集数名称',
      url: '播放地址'
    }
  ]
}
```

### 豆瓣详情数据映射
```javascript
{
  id: '豆瓣 ID',
  title: '标题',
  poster: '海报',
  rate: '评分',
  year: '年份',
  directors: ['导演列表'],
  screenwriters: ['编剧列表'],
  cast: ['演员列表'],
  genres: ['类型列表'],
  countries: ['国家列表'],
  languages: ['语言列表'],
  episodes: '集数 (电视剧)',
  episode_length: '单集时长 (分钟)',
  movie_duration: '电影时长 (分钟)',
  first_aired: '首播日期',
  plot_summary: '剧情简介',
  celebrities: [
    {
      id: '演员 ID',
      name: '演员姓名',
      avatar: '头像',
      role: '角色',
      avatars: {
        small: '小头像',
        medium: '中头像',
        large: '大头像'
      }
    }
  ],
  recommendations: [
    {
      id: '推荐影片 ID',
      title: '推荐影片标题',
      poster: '推荐影片海报',
      rate: '推荐影片评分'
    }
  ],
  backdrop: '背景图',
  trailerUrl: '预告片地址'
}
```

---

## 缓存策略

### 搜索接口缓存
- **缓存时间**: 根据后端配置
- **缓存键**: `query:{keyword}`
- **缓存策略**: 公开缓存,CDN 可缓存

### 详情接口缓存
- **缓存时间**: 不缓存 (实时更新)
- **缓存键**: `source:{source}|id:{id}`
- **缓存策略**: 禁用缓存

### 豆瓣详情缓存
- **缓存时间**: 4 小时 (爬虫), 30 分钟 (预告片)
- **缓存键**: 豆瓣 ID
- **缓存策略**: 公开缓存,CDN 可缓存

---

## 代理配置

### 开发环境代理
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '/api')
    }
  }
}
```

### 生产环境配置
生产环境建议:
1. 使用 Nginx 反向代理
2. 配置 CORS 策略
3. 启用 CDN 加速

---

## 性能优化

### 请求优化
1. **并发请求**: 使用 `Promise.all` 并行请求
2. **请求去重**: 避免重复请求相同数据
3. **请求取消**: 组件卸载时取消未完成请求

### 数据缓存
1. **客户端缓存**: 使用 Pinia 存储状态
2. **本地存储**: 使用 `uni.setStorageSync` 持久化
3. **内存缓存**: 使用 `Map` 对象缓存热点数据

### 加载优化
1. **懒加载**: 按需加载页面和组件
2. **图片优化**: 使用 CDN,压缩图片
3. **虚拟滚动**: 大量数据使用虚拟列表

---

## 测试建议

### 单元测试
使用 Jest 测试 API 调用函数:
```javascript
import { searchVideo } from '@/api/video'

test('searchVideo should return results', async () => {
  const results = await searchVideo('test')
  expect(results.results).toBeDefined()
})
```

### 集成测试
使用真实后端测试:
```javascript
test('API integration test', async () => {
  const searchResults = await searchVideo('test')
  expect(searchResults.results.length).toBeGreaterThan(0)

  const video = searchResults.results[0]
  const detail = await getVideoDetail(video.vod_id, video.vod_source_from)
  expect(detail.data.playList).toBeDefined()
})
```

---

## 注意事项

1. **CORS 问题**: 生产环境需要配置后端 CORS 或使用代理
2. **Cookie 认证**: 某些接口需要登录后才能访问
3. **请求频率**: 避免频繁请求,合理使用缓存
4. **错误处理**: 完善的错误处理和用户提示
5. **数据验证**: 验证 API 返回的数据完整性
6. **安全性**: 敏感信息不要存储在前端
7. **版本兼容**: 关注 API 版本更新,及时适配
