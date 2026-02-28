<template>
  <view class="test-container">
    <text class="test-text">测试页面 - 如果你看到这段文字，说明页面加载成功</text>
    <view class="test-info">
      <text>当前时间: {{ currentTime }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')

onMounted(() => {
  console.log('Test page mounted')
  currentTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background-color: #0d0d0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.test-text {
  color: #ffffff;
  font-size: 32rpx;
  text-align: center;
  margin-bottom: 40rpx;
}

.test-info {
  color: #e50914;
  font-size: 28rpx;
}
</style>
