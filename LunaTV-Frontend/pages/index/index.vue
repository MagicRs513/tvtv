<template>
  <view class="home-page">
    <view class="header">
      <text class="title">LunaTV</text>
      <text class="user-info">{{ userStore.username }}</text>
    </view>
    
    <scroll-view scroll-y class="content" @scrolltolower="loadMore">
      <view class="video-list">
        <view 
          class="video-item" 
          v-for="(item, index) in videoList" 
          :key="item.id"
          :class="{ 'focused': focusedIndex === index }"
          @click="handleVideoClick(item, index)"
        >
          <image class="video-poster" :src="item.poster" mode="aspectFill"></image>
          <view class="video-info">
            <text class="video-title">{{ item.title }}</text>
            <text class="video-meta">{{ item.year }} · {{ item.type }}</text>
          </view>
        </view>
      </view>
      
      <view class="loading" v-if="loading">
        <text>加载中...</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getVideos } from '../../src/api/video'
import { useUserStore } from '../../src/stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    const videoList = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const focusedIndex = ref(-1)
    
    const loadVideos = async (page = 1) => {
      if (loading.value) return
      
      loading.value = true
      
      try {
        const res = await getVideos(page, 20)
        
        if (page === 1) {
          videoList.value = res.data || []
        } else {
          videoList.value.push(...(res.data || []))
        }
      } catch (error) {
        console.error('加载视频失败:', error)
        uni.showToast({ title: '加载失败', icon: 'none' })
      } finally {
        loading.value = false
      }
    }
    
    const loadMore = () => {
      currentPage.value++
      loadVideos(currentPage.value)
    }
    
    const handleVideoClick = (video, index) => {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${video.id}&title=${encodeURIComponent(video.title)}`
      })
    }
    
    onMounted(() => {
      loadVideos()
      
      uni.onKeyboardHeightChange((res) => {
        console.log('键盘高度变化:', res.height)
      })
    })
    
    return {
      userStore,
      videoList,
      loading,
      focusedIndex,
      loadMore,
      handleVideoClick
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10rpx);
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #e50914;
  letter-spacing: 5rpx;
}

.user-info {
  font-size: 28rpx;
  color: #ffffff;
}

.content {
  flex: 1;
  padding: 30rpx;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.video-item {
  display: flex;
  gap: 30rpx;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.video-item.focused {
  background: rgba(229, 9, 20, 0.15);
  border-color: #e50914;
  transform: scale(1.02);
}

.video-poster {
  width: 200rpx;
  height: 300rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.video-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15rpx;
}

.video-title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  font-size: 24rpx;
  color: #999;
}

.loading {
  text-align: center;
  padding: 40rpx;
  color: #666;
}
</style>
