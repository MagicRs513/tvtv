<template>
  <view class="player-page">
    <view class="header">
      <text class="back-btn" @click="handleBack">返回</text>
      <text class="title">{{ videoTitle }}</text>
    </view>
    
    <view class="player-container">
      <video 
        id="videoPlayer"
        class="video-player"
        :src="videoUrl"
        :show-center-play-btn="false"
        :show-play-btn="false"
        :show-fullscreen-btn="false"
        controls
        autoplay
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @ended="onEnded"
        @error="onError"
      ></video>
    </view>
    
    <view class="controls">
      <view class="progress-bar">
        <view class="progress-bg">
          <view class="progress-fill" :style="{ width: progress + '%' }"></view>
        </view>
      </view>
      
      <view class="time-display">
        <text class="time">{{ formatTime(currentTime) }}</text>
        <text class="time">{{ formatTime(duration) }}</text>
      </view>
      
      <view class="control-buttons">
        <text class="control-btn" @click="togglePlay">
          {{ isPlaying ? '暂停' : '播放' }}
        </text>
        <text class="control-btn" @click="seekBackward">后退10秒</text>
        <text class="control-btn" @click="seekForward">前进10秒</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const videoUrl = ref('')
    const videoTitle = ref('')
    const currentTime = ref(0)
    const duration = ref(0)
    const progress = ref(0)
    const isPlaying = ref(false)
    
    let videoContext = null
    
    const onPlay = () => {
      isPlaying.value = true
    }
    
    const onPause = () => {
      isPlaying.value = false
    }
    
    const onTimeUpdate = (e) => {
      currentTime.value = e.detail.currentTime
      if (duration.value > 0) {
        progress.value = (currentTime.value / duration.value) * 100
      }
    }
    
    const onEnded = () => {
      isPlaying.value = false
    }
    
    const onError = (e) => {
      console.error('播放错误:', e)
      uni.showToast({ title: '播放失败', icon: 'none' })
    }
    
    const togglePlay = () => {
      if (videoContext) {
        if (isPlaying.value) {
          videoContext.pause()
        } else {
          videoContext.play()
        }
      }
    }
    
    const seekBackward = () => {
      if (videoContext) {
        videoContext.seek(currentTime.value - 10)
      }
    }
    
    const seekForward = () => {
      if (videoContext) {
        videoContext.seek(currentTime.value + 10)
      }
    }
    
    const handleBack = () => {
      uni.navigateBack()
    }
    
    const formatTime = (seconds) => {
      if (!seconds || isNaN(seconds)) return '0:00'
      const min = Math.floor(seconds / 60)
      const sec = Math.floor(seconds % 60)
      return `${min}:${sec.toString().padStart(2, '0')}`
    }
    
    onMounted(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      
      if (currentPage) {
        videoUrl.value = decodeURIComponent(currentPage.options.url || '')
        videoTitle.value = decodeURIComponent(currentPage.options.title || '')
      }
      
      setTimeout(() => {
        videoContext = uni.createVideoContext('videoPlayer')
        if (videoContext) {
          videoContext.play()
        }
      }, 100)
    })
    
    return {
      videoUrl,
      videoTitle,
      currentTime,
      duration,
      progress,
      isPlaying,
      onPlay,
      onPause,
      onTimeUpdate,
      onEnded,
      onError,
      togglePlay,
      seekBackward,
      seekForward,
      handleBack,
      formatTime
    }
  }
}
</script>

<style scoped>
.player-page {
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
  padding: 20rpx 40rpx;
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
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.player-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.video-player {
  width: 100%;
  height: 100%;
}

.controls {
  padding: 30rpx 40rpx;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10rpx);
}

.progress-bar {
  margin-bottom: 20rpx;
}

.progress-bg {
  width: 100%;
  height: 6rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #e50914;
  border-radius: 3rpx;
  transition: width 0.3s;
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.time {
  font-size: 24rpx;
  color: #fff;
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 40rpx;
}

.control-btn {
  padding: 10rpx 30rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8rpx;
  color: #fff;
  font-size: 28rpx;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:active {
  background: rgba(229, 9, 20, 0.3);
}
</style>
