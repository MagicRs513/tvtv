<template>
  <view>
    <text>App Root</text>
  </view>
</template>

<script>
export default {
  onLaunch: function() {
    console.log('========== App onLaunch ==========')
    console.log('时间:', new Date().toLocaleString())
    console.log('系统信息:', uni.getSystemInfoSync())
    
    try {
      uni.showToast({
        title: '应用启动',
        icon: 'success',
        duration: 2000
      })
      console.log('Toast 显示成功')
    } catch (e) {
      console.error('Toast 错误:', e)
    }
  },
  onShow: function() {
    console.log('========== App onShow ==========')
  },
  onHide: function() {
    console.log('========== App onHide ==========')
  }
}
</script>

<style>
view {
  padding: 20px;
}

text {
  color: #e50914;
  font-size: 20px;
}
</style>
