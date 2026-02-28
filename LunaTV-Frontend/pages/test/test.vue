<template>
  <view>
    <text>测试页面</text>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
    console.log('测试页面加载成功')
    uni.showToast({
      title: '页面加载成功',
      icon: 'success'
    })
  }
}
</script>

<style>
view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0d0d0d;
}

text {
  color: #ffffff;
  font-size: 20px;
}
</style>
