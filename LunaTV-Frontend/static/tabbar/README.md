# TabBar 图标说明

本项目的底部导航栏使用以下图标:

## 首页
- 图标文件: `static/tabbar/home.png`
- 激活状态: `static/tabbar/home-active.png`
- 尺寸: 24x24 px

## 分类
- 图标文件: `static/tabbar/category.png`
- 激活状态: `static/tabbar/category-active.png`
- 尺寸: 24x24 px

## 搜索
- 图标文件: `static/tabbar/search.png`
- 激活状态: `static/tabbar/search-active.png`
- 尺寸: 24x24 px

## 收藏
- 图标文件: `static/tabbar/favorite.png`
- 激活状态: `static/tabbar/favorite-active.png`
- 尺寸: 24x24 px

## 注意事项

请将对应的图标文件放置到 `static/tabbar/` 目录下。图标支持 PNG 格式,建议使用透明背景。

如没有自定义图标,可以使用 uni-ui 默认图标替代:
```javascript
tabBar: {
  list: [
    {
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "static/tabbar/home.png",
      selectedIconPath: "static/tabbar/home-active.png"
    }
  ]
}
```

或者使用 uni-icons 组件:
```vue
<uni-icons type="home" size="24"></uni-icons>
```
