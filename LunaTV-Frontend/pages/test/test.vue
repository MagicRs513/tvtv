<template>
  <view class="container">
    <view class="content">
      <text class="title">LunaTV 测试页面</text>
      <text class="info">{{ message }}</text>
      <text class="info">时间: {{ time }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: '如果你看到这段文字，说明页面加载成功',
      time: ''
    }
  },
  onLoad(options) {
    console.log('测试页面 onLoad', options)
    this.time = new Date().toLocaleString()
    
    try {
      uni.showToast({
        title: '页面加载成功',
        icon: 'success',
        duration: 2000
      })
    } catch (e) {
      console.error('Toast 错误:', e)
    }
  },
  onShow() {
    console.log('测试页面 onShow')
  },
  onReady() {
    console.log('测试页面 onReady')
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
  background-color: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
}

.title {
  display: block;
  color: #e50914;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info {
  display: block;
  color: #ffffff;
  font-size: 16px;
  margin: 10px 0;
}
</style>
