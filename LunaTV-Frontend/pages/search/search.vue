<template>
  <view class="container">
    <view class="search-bar">
      <uni-icons type="back" size="24" color="#fff" @click="handleBack"></uni-icons>
      <input
        class="search-input"
        v-model="keyword"
        placeholder="搜索影片..."
        @confirm="handleSearch"
        :focus="true"
      />
      <text class="search-btn" @click="handleSearch">搜索</text>
    </view>

    <scroll-view scroll-y class="content" v-if="!loading && searchResults.length > 0">
      <view class="result-info">
        <text class="result-count">找到 {{ searchResults.length }} 个结果</text>
      </view>

      <view class="video-list">
        <view
          class="video-item"
          v-for="(video, index) in searchResults"
          :key="index"
          @click="handleVideoClick(video)"
        >
          <image class="item-image" :src="video.vod_pic" mode="aspectFill"></image>
          <view class="item-info">
            <text class="item-title">{{ video.vod_name }}</text>
            <text class="item-year">{{ video.vod_year }}</text>
            <text class="item-remarks">{{ video.vod_remarks }}</text>
            <text class="item-source">{{ video.vod_source_from }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="empty-state" v-if="!loading && searchResults.length === 0 && hasSearched">
      <uni-icons type="info" size="64" color="#666"></uni-icons>
      <text class="empty-text">未找到相关影片</text>
    </view>

    <view class="loading-state" v-if="loading">
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVideoStore } from '../../src/stores/video'
import { useUserStore } from '../../src/stores/user'

const videoStore = useVideoStore()
const userStore = useUserStore()

const keyword = ref('')
const loading = ref(false)
const hasSearched = ref(false)
const searchResults = ref([])

onMounted(() => {
  if (!userStore.isLoggedIn) {
    uni.redirectTo({ url: '/pages/login/login' })
  }
})

async function handleSearch() {
  if (!keyword.value.trim()) {
    uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
    return
  }

  loading.value = true
  hasSearched.value = true

  try {
    await videoStore.performSearch(keyword.value)
    searchResults.value = videoStore.searchResults
  } finally {
    loading.value = false
  }
}

function handleVideoClick(video) {
  videoStore.setCurrentVideo(video)
  uni.navigateTo({ url: `/pages/detail/detail?id=${video.vod_id}&source=${video.vod_source_from}` })
}

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #0d0d0d;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 30rpx;
  background: rgba(13, 13, 13, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  flex: 1;
  height: 70rpx;
  padding: 0 20rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 35rpx;
  color: #fff;
  font-size: 28rpx;
}

.search-btn {
  color: #e50914;
  font-size: 28rpx;
  font-weight: bold;
}

.content {
  padding: 20rpx;
}

.result-info {
  margin-bottom: 30rpx;
  padding: 0 10rpx;
}

.result-count {
  font-size: 24rpx;
  color: #999;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.video-item {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
}

.item-image {
  width: 200rpx;
  height: 280rpx;
  border-radius: 12rpx;
  background: #2a2a2a;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10rpx 0;
}

.item-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10rpx;
}

.item-year {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.item-remarks {
  font-size: 24rpx;
  color: #e50914;
  margin-bottom: 8rpx;
}

.item-source {
  font-size: 22rpx;
  color: #666;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #666;
  margin-top: 30rpx;
}

.loading-state {
  padding: 100rpx 0;
  text-align: center;
}
</style>
