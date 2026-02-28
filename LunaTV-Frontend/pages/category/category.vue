<template>
  <view class="container">
    <view class="header">
      <text class="header-title">分类浏览</text>
    </view>

    <scroll-view scroll-y class="content" v-if="!loading && categories.length > 0">
      <view class="category-list">
        <view
          class="category-item"
          v-for="(category, index) in categories"
          :key="index"
          @click="handleCategoryClick(category)"
        >
          <view class="category-icon">
            <uni-icons :type="getCategoryIcon(category.type)" size="32" :color="getCategoryColor(category.type)"></uni-icons>
          </view>
          <view class="category-info">
            <text class="category-name">{{ category.name }}</text>
            <text class="category-count">{{ category.count }} 部</text>
          </view>
          <uni-icons type="right" size="20" color="#666"></uni-icons>
        </view>
      </view>
    </scroll-view>

    <view class="empty-state" v-if="!loading && categories.length === 0">
      <uni-icons type="list" size="64" color="#666"></uni-icons>
      <text class="empty-text">暂无分类数据</text>
    </view>

    <view class="loading-state" v-if="loading">
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../../src/api/video'

const categories = ref([])
const loading = ref(false)

onMounted(async () => {
  await fetchCategories()
})

async function fetchCategories() {
  loading.value = true
  try {
    const response = await getCategories()
    categories.value = response.data || []
  } catch (error) {
    console.error('获取分类失败:', error)
    uni.showToast({ title: '获取分类失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

function handleCategoryClick(category) {
  uni.navigateTo({ url: `/pages/search/search?type=${category.type}&name=${encodeURIComponent(category.name)}` })
}

function getCategoryIcon(type) {
  const icons = {
    movie: 'videocam',
    tv: 'tv',
    variety: 'mic',
    anime: 'fire',
    documentary: 'camera',
    other: 'folder'
  }
  return icons[type] || 'folder'
}

function getCategoryColor(type) {
  const colors = {
    movie: '#e50914',
    tv: '#f5a623',
    variety: '#50c878',
    anime: '#ff6b6b',
    documentary: '#4ecdc4',
    other: '#999'
  }
  return colors[type] || '#999'
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

.category-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 25rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(229, 9, 20, 0.1);
  border-radius: 16rpx;
}

.category-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.category-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.category-count {
  font-size: 24rpx;
  color: #999;
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
