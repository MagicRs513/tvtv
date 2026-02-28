<template>
  <view class="search-page">
    <view class="search-bar">
      <input 
        class="search-input" 
        v-model="keyword" 
        placeholder="搜索影片..."
        placeholder-style="color: #666"
        @confirm="handleSearch"
        confirm-type="search"
      />
      <text class="search-btn" @click="handleSearch">搜索</text>
    </view>
    
    <scroll-view scroll-y class="content" v-if="searchResults.length > 0">
      <view class="result-list">
        <view 
          class="result-item" 
          v-for="(item, index) in searchResults" 
          :key="item.id"
          :class="{ 'focused': focusedIndex === index }"
          @click="handleVideoClick(item, index)"
        >
          <image class="item-poster" :src="item.poster" mode="aspectFill"></image>
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-meta">{{ item.year }} · {{ item.type }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <view class="empty" v-else-if="hasSearched">
      <text>未找到相关影片</text>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'
import { searchVideos } from '../../src/api/video'

export default {
  setup() {
    const keyword = ref('')
    const searchResults = ref([])
    const hasSearched = ref(false)
    const focusedIndex = ref(-1)
    
    const handleSearch = async () => {
      if (!keyword.value.trim()) {
        uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
        return
      }
      
      try {
        const res = await searchVideos(keyword.value)
        searchResults.value = res.data || []
        hasSearched.value = true
      } catch (error) {
        console.error('搜索失败:', error)
        uni.showToast({ title: '搜索失败', icon: 'none' })
      }
    }
    
    const handleVideoClick = (video, index) => {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${video.id}&title=${encodeURIComponent(video.title)}`
      })
    }
    
    return {
      keyword,
      searchResults,
      hasSearched,
      focusedIndex,
      handleSearch,
      handleVideoClick
    }
  }
}
</script>

<style scoped>
.search-page {
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 30rpx 40rpx;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10rpx);
}

.search-input {
  flex: 1;
  padding: 25rpx 30rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12rpx;
  font-size: 32rpx;
  color: #ffffff;
}

.search-btn {
  font-size: 32rpx;
  color: #e50914;
  font-weight: bold;
  padding: 10rpx 20rpx;
}

.content {
  flex: 1;
  padding: 30rpx;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result-item {
  display: flex;
  gap: 30rpx;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.result-item.focused {
  background: rgba(229, 9, 20, 0.15);
  border-color: #e50914;
  transform: scale(1.02);
}

.item-poster {
  width: 200rpx;
  height: 300rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15rpx;
}

.item-title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  font-size: 24rpx;
  color: #999;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 32rpx;
}
</style>
