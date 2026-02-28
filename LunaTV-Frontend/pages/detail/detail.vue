<template>
  <view class="detail-page">
    <view class="header" v-if="videoInfo">
      <text class="back-btn" @click="handleBack">返回</text>
      <text class="title">{{ videoInfo.title }}</text>
    </view>
    
    <scroll-view scroll-y class="content" v-if="videoInfo">
      <view class="poster-section">
        <image class="poster" :src="videoInfo.poster" mode="aspectFill"></image>
      </view>
      
      <view class="info-section">
        <view class="info-item">
          <text class="label">年份：</text>
          <text class="value">{{ videoInfo.year }}</text>
        </view>
        <view class="info-item">
          <text class="label">类型：</text>
          <text class="value">{{ videoInfo.type }}</text>
        </view>
        <view class="info-item">
          <text class="label">评分：</text>
          <text class="value">{{ videoInfo.rating || '暂无' }}</text>
        </view>
        <view class="info-item">
          <text class="label">简介：</text>
        </view>
        <text class="description">{{ videoInfo.description || '暂无简介' }}</text>
      </view>
      
      <view class="episodes-section">
        <text class="section-title">选集</text>
        <view class="episodes-list">
          <view 
            class="episode-item"
            v-for="(ep, index) in episodes"
            :key="index"
            :class="{ 'focused': focusedEpisode === index, 'current': currentEpisode === index }"
            @click="handleEpisodeClick(ep, index)"
          >
            <text>第 {{ ep }} 集</text>
          </view>
        </view>
      </view>
      
      <view class="action-section">
        <button class="play-btn" @click="handlePlay">
          播放
        </button>
      </view>
    </scroll-view>
    
    <view class="loading" v-else>
      <text>加载中...</text>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getVideoDetail, getVideoPlayUrl } from '../../src/api/video'

export default {
  setup() {
    const videoId = ref('')
    const videoTitle = ref('')
    const videoInfo = ref(null)
    const episodes = ref([])
    const currentEpisode = ref(0)
    const focusedEpisode = ref(0)
    
    const loadVideoDetail = async () => {
      try {
        const res = await getVideoDetail(videoId.value)
        videoInfo.value = res.data
        episodes.value = Array.from({ length: res.data.episodes || 1 }, (_, i) => i + 1)
      } catch (error) {
        console.error('加载详情失败:', error)
        uni.showToast({ title: '加载失败', icon: 'none' })
      }
    }
    
    const handleBack = () => {
      uni.navigateBack()
    }
    
    const handleEpisodeClick = (episode, index) => {
      currentEpisode.value = index
      focusedEpisode.value = index
    }
    
    const handlePlay = async () => {
      try {
        const res = await getVideoPlayUrl(videoId.value, currentEpisode.value + 1)
        
        uni.navigateTo({
          url: `/pages/player/player?url=${encodeURIComponent(res.data.url)}&title=${encodeURIComponent(videoTitle.value)}`
        })
      } catch (error) {
        console.error('获取播放地址失败:', error)
        uni.showToast({ title: '播放失败', icon: 'none' })
      }
    }
    
    onMounted(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      videoId.value = currentPage.options.id
      videoTitle.value = decodeURIComponent(currentPage.options.title || '')
      
      loadVideoDetail()
    })
    
    return {
      videoInfo,
      episodes,
      currentEpisode,
      focusedEpisode,
      handleBack,
      handleEpisodeClick,
      handlePlay
    }
  }
}
</script>

<style scoped>
.detail-page {
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  gap: 40rpx;
  padding: 30rpx 40rpx;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10rpx);
}

.back-btn {
  font-size: 28rpx;
  color: #e50914;
  cursor: pointer;
}

.title {
  flex: 1;
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 40rpx;
}

.poster-section {
  margin-bottom: 40rpx;
  display: flex;
  justify-content: center;
}

.poster {
  width: 400rpx;
  height: 600rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(229, 9, 20, 0.3);
}

.info-section {
  margin-bottom: 40rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16rpx;
}

.info-item {
  display: flex;
  margin-bottom: 20rpx;
  gap: 10rpx;
}

.label {
  font-size: 28rpx;
  color: #999;
  min-width: 100rpx;
}

.value {
  font-size: 28rpx;
  color: #ffffff;
}

.description {
  font-size: 28rpx;
  color: #ccc;
  line-height: 1.6;
}

.episodes-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.episodes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.episode-item {
  padding: 15rpx 30rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.episode-item.focused {
  background: rgba(229, 9, 20, 0.15);
  border-color: #e50914;
  transform: scale(1.05);
}

.episode-item.current {
  background: rgba(229, 9, 20, 0.3);
}

.action-section {
  display: flex;
  justify-content: center;
}

.play-btn {
  width: 400rpx;
  height: 90rpx;
  background: linear-gradient(135deg, #e50914 0%, #b2070f 100%);
  color: #ffffff;
  font-size: 36rpx;
  font-weight: bold;
  border-radius: 12rpx;
  border: none;
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 32rpx;
}
</style>
