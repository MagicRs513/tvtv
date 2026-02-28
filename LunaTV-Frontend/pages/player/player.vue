<template>
  <view class="container">
    <view class="header">
      <uni-icons type="back" size="24" color="#fff" @click="handleBack"></uni-icons>
      <text class="header-title">{{ episodeName }}</text>
      <uni-icons type="more" size="24" color="#fff" @click="handleMore"></uni-icons>
    </view>

    <view class="player-container">
      <video
        id="videoPlayer"
        class="video-player"
        :src="videoUrl"
        :poster="poster"
        controls
        autoplay
        show-center-play-btn
        show-play-btn
        show-fullscreen-btn
        enable-play-gesture
        page-gesture
      ></video>
    </view>

    <view class="info-section">
      <text class="episode-title">{{ episodeName }}</text>
    </view>

    <view class="controls-section">
      <view class="control-item" @click="handlePrevious">
        <uni-icons type="left" size="24" color="#fff"></uni-icons>
        <text class="control-text">上一集</text>
      </view>
      <view class="control-item" @click="handleNext">
        <text class="control-text">下一集</text>
        <uni-icons type="right" size="24" color="#fff"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const videoUrl = ref('')
const episodeName = ref('')
const poster = ref('')

const options = ref({
  url: '',
  name: '',
  poster: ''
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  options.value.url = decodeURIComponent(currentPage.options.url || '')
  options.value.name = decodeURIComponent(currentPage.options.name || '')
  options.value.poster = decodeURIComponent(currentPage.options.poster || '')

  videoUrl.value = options.value.url
  episodeName.value = options.value.name
  poster.value = options.value.poster
})

function handleBack() {
  uni.navigateBack()
}

function handleMore() {
  uni.showToast({ title: '更多功能开发中', icon: 'none' })
}

function handlePrevious() {
  uni.showToast({ title: '暂无上一集', icon: 'none' })
}

function handleNext() {
  uni.showToast({ title: '暂无下一集', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #0d0d0d;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: rgba(13, 13, 13, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-title {
  flex: 1;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-container {
  width: 100%;
  background: #000;
}

.video-player {
  width: 100%;
  height: 100vh;
}

.info-section {
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
}

.episode-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.controls-section {
  display: flex;
  gap: 20rpx;
  padding: 30rpx;
}

.control-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 25rpx;
  background: rgba(229, 9, 20, 0.2);
  border-radius: 12rpx;
  border: 1px solid rgba(229, 9, 20, 0.5);
}

.control-text {
  font-size: 28rpx;
  color: #fff;
}
</style>
