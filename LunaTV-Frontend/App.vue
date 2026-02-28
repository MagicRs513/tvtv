<template>
  <view></view>
</template>

<script>
export default {
  onLaunch: function() {
    console.log('LunaTV TV 启动')
    
    const token = uni.getStorageSync('token')
    if (!token) {
      uni.redirectTo({
        url: '/pages/login/login'
      })
    }
  }
}
</script>

<style>
page {
  background-color: #000000;
}
</style>
