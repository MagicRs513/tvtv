<template>
  <view class="container">
    <view class="header">
      <text class="title">LunaTV</text>
      <view class="header-actions">
        <uni-icons type="scan" size="24" color="#fff" @click="handleScan"></uni-icons>
      </view>
    </view>

    <scroll-view scroll-y class="content">
      <view class="hero-section" v-if="heroList.length > 0">
        <swiper class="hero-swiper" autoplay circular indicator-dots>
          <swiper-item v-for="(item, index) in heroList" :key="index" @click="handleHeroClick(item)">
            <image class="hero-image" :src="item.vod_pic" mode="aspectFill"></image>
            <view class="hero-overlay">
              <text class="hero-title">{{ item.vod_name }}</text>
              <text class="hero-subtitle">{{ item.vod_remarks }}</text>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="quick-actions">
        <view class="action-item" v-for="(action, index) in quickActions" :key="index" @click="handleQuickAction(action)">
          <uni-icons :type="action.icon" size="28" :color="action.color"></uni-icons>
          <text class="action-text">{{ action.text }}</text>
        </view>
      </view>

      <view class="section" v-for="section in sections" :key="section.title">
        <view class="section-header">
          <text class="section-title">{{ section.title }}</text>
          <text class="section-more" @click="handleMore(section)">更多 ></text>
        </view>
        <scroll-view scroll-x class="section-content">
          <view class="video-card" v-for="(video, index) in section.videos" :key="index" @click="handleVideoClick(video)">
            <image class="card-image" :src="video.vod_pic" mode="aspectFill"></image>
            <view class="card-info">
              <text class="card-title">{{ video.vod_name }}</text>
              <text class="card-remarks">{{ video.vod_remarks }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVideoStore } from '../../src/stores/video'
import { useFavoriteStore } from '../../src/stores/favorite'

const videoStore = useVideoStore()
const favoriteStore = useFavoriteStore()

const heroList = ref([])
const sections = ref([])

const quickActions = [
  { icon: 'search', text: '搜索', color: '#e50914' },
  { icon: 'star', text: '收藏', color: '#f5a623' },
  { icon: 'calendar', text: '更新', color: '#50c878' },
  { icon: 'fire', text: '热门', color: '#ff6b6b' }
]

onMounted(async () => {
  await fetchHomeData()
})

async function fetchHomeData() {
  await Promise.all([
    fetchHeroSection(),
    fetchSections()
  ])
}

async function fetchHeroSection() {
  heroList.value = []
}

async function fetchSections() {
  sections.value = []
}

function handleScan() {
  uni.showToast({ title: '扫码功能开发中', icon: 'none' })
}

function handleQuickAction(action) {
  if (action.text === '搜索') {
    uni.navigateTo({ url: '/pages/search/search' })
  } else if (action.text === '收藏') {
    uni.navigateTo({ url: '/pages/favorites/favorites' })
  } else {
    uni.showToast({ title: `${action.text}功能开发中`, icon: 'none' })
  }
}

function handleHeroClick(video) {
  handleVideoClick(video)
}

function handleVideoClick(video) {
  videoStore.setCurrentVideo(video)
  uni.navigateTo({ url: `/pages/detail/detail?id=${video.vod_id}&source=${video.vod_source_from}` })
}

function handleMore(section) {
  uni.navigateTo({ url: `/pages/category/category?type=${section.type}` })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 40rpx;
  background: rgba(13, 13, 13, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #e50914;
  letter-spacing: 4rpx;
}

.header-actions {
  display: flex;
  gap: 20rpx;
}

.content {
  padding: 20rpx;
}

.hero-section {
  margin-bottom: 40rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.hero-swiper {
  height: 400rpx;
  border-radius: 20rpx;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
}

.hero-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10rpx;
}

.hero-subtitle {
  font-size: 24rpx;
  color: #999;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  margin-bottom: 40rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.action-text {
  font-size: 24rpx;
  color: #fff;
}

.section {
  margin-bottom: 50rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

.section-more {
  font-size: 24rpx;
  color: #e50914;
}

.section-content {
  white-space: nowrap;
}

.video-card {
  display: inline-block;
  width: 220rpx;
  margin-right: 20rpx;
  vertical-align: top;
}

.card-image {
  width: 220rpx;
  height: 320rpx;
  border-radius: 12rpx;
  background: #2a2a2a;
}

.card-info {
  padding: 10rpx 0;
}

.card-title {
  display: block;
  font-size: 24rpx;
  color: #fff;
  margin-bottom: 6rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-remarks {
  font-size: 20rpx;
  color: #999;
}
</style>
