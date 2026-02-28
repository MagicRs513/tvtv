<template>
  <view class="container">
    <view class="header">
      <text class="header-title">我的收藏</text>
    </view>

    <scroll-view scroll-y class="content" v-if="!loading && favorites.length > 0">
      <view class="video-list">
        <view
          class="video-item"
          v-for="(item, index) in favorites"
          :key="index"
          @click="handleVideoClick(item)"
        >
          <image class="item-image" :src="item.video_pic" mode="aspectFill"></image>
          <view class="item-info">
            <text class="item-title">{{ item.video_name }}</text>
            <text class="item-source">{{ item.video_source_from }}</text>
            <text class="item-date">{{ formatDate(item.created_at) }}</text>
          </view>
          <uni-icons type="trash" size="24" color="#e50914" @click.stop="handleRemoveFavorite(item)"></uni-icons>
        </view>
      </view>
    </scroll-view>

    <view class="empty-state" v-if="!loading && favorites.length === 0">
      <uni-icons type="star" size="64" color="#666"></uni-icons>
      <text class="empty-text">暂无收藏</text>
    </view>

    <view class="loading-state" v-if="loading">
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFavoriteStore } from '../../src/stores/favorite'
import { useVideoStore } from '../../src/stores/video'
import { useUserStore } from '../../src/stores/user'

const favoriteStore = useFavoriteStore()
const videoStore = useVideoStore()
const userStore = useUserStore()

const favorites = ref([])
const loading = ref(false)

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    uni.redirectTo({ url: '/pages/login/login' })
    return
  }

  await fetchFavorites()
})

async function fetchFavorites() {
  loading.value = true
  try {
    await favoriteStore.fetchFavorites()
    favorites.value = favoriteStore.favorites
  } finally {
    loading.value = false
  }
}

function handleVideoClick(item) {
  videoStore.setCurrentVideo({
    vod_id: item.video_id,
    vod_name: item.video_name,
    vod_pic: item.video_pic,
    vod_source_from: item.video_source_from
  })
  uni.navigateTo({ url: `/pages/detail/detail?id=${item.video_id}&source=${item.video_source_from}` })
}

async function handleRemoveFavorite(item) {
  await favoriteStore.removeFromFavorite(item.id || item.video_id)
  favorites.value = favoriteStore.favorites
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #0d0d0d;
}

.header {
  padding: 20rpx 30rpx;
  background: rgba(13, 13, 13, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.content {
  padding: 20rpx;
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
  position: relative;
}

.item-image {
  width: 160rpx;
  height: 220rpx;
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
  padding-right: 50rpx;
}

.item-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-source {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.item-date {
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
