<template>
  <view class="container">
    <view class="header" v-if="video">
      <uni-icons type="back" size="24" color="#fff" @click="handleBack"></uni-icons>
      <text class="header-title">{{ video.vod_name }}</text>
      <uni-icons type="star" :size="24" :color="isFavorite ? '#f5a623' : '#fff'" @click="toggleFavorite"></uni-icons>
    </view>

    <scroll-view scroll-y class="content" v-if="video">
      <image class="poster" :src="video.vod_pic" mode="aspectFill"></image>

      <view class="video-info">
        <text class="video-title">{{ video.vod_name }}</text>
        <text class="video-remarks">{{ video.vod_remarks }}</text>
        <view class="info-row">
          <text class="info-label">年份:</text>
          <text class="info-value">{{ video.vod_year }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">来源:</text>
          <text class="info-value">{{ video.vod_source_from }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">导演:</text>
          <text class="info-value">{{ video.vod_director || '未知' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">主演:</text>
          <text class="info-value">{{ video.vod_actor || '未知' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">类型:</text>
          <text class="info-value">{{ video.vod_class || '未知' }}</text>
        </view>
      </view>

      <view class="plot-section" v-if="video.vod_content">
        <text class="section-title">剧情简介</text>
        <text class="plot-text">{{ video.vod_content }}</text>
      </view>

      <view class="episodes-section" v-if="detail && detail.playList && detail.playList.length > 0">
        <text class="section-title">选集</text>
        <view class="episodes-list">
          <view
            class="episode-item"
            v-for="(episode, index) in detail.playList"
            :key="index"
            @click="handlePlayEpisode(index)"
          >
            <text class="episode-text">{{ episode.name }}</text>
          </view>
        </view>
      </view>

      <view class="loading-state" v-if="loading">
        <uni-load-more status="loading"></uni-load-more>
      </view>
    </scroll-view>

    <view class="empty-state" v-if="!video && !loading">
      <uni-icons type="info" size="64" color="#666"></uni-icons>
      <text class="empty-text">影片信息加载失败</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVideoStore } from '@/stores/video'
import { useFavoriteStore } from '@/stores/favorite'

const videoStore = useVideoStore()
const favoriteStore = useFavoriteStore()

const video = computed(() => videoStore.currentVideo)
const detail = computed(() => videoStore.currentDetail)
const loading = computed(() => videoStore.loading)

const isFavorite = computed(() => {
  return video.value ? favoriteStore.isFavorite(video.value.vod_id) : false
})

const options = ref({
  id: '',
  source: ''
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  options.value.id = currentPage.options.id || ''
  options.value.source = currentPage.options.source || ''

  if (options.value.id && options.value.source) {
    fetchVideoDetail()
  } else if (video.value) {
    options.value.id = video.value.vod_id
    options.value.source = video.value.vod_source_from
    fetchVideoDetail()
  }
})

async function fetchVideoDetail() {
  await videoStore.fetchVideoDetail(options.value.id, options.value.source)
}

async function toggleFavorite() {
  if (!video.value) return

  if (isFavorite.value) {
    await favoriteStore.removeFromFavorite(video.value.vod_id)
  } else {
    await favoriteStore.addToFavorite({
      video_id: video.value.vod_id,
      video_name: video.value.vod_name,
      video_pic: video.value.vod_pic,
      video_source_from: video.value.vod_source_from
    })
  }
}

function handlePlayEpisode(episodeIndex) {
  if (!detail.value || !detail.value.playList) return

  const episode = detail.value.playList[episodeIndex]
  uni.navigateTo({
    url: `/pages/player/player?url=${encodeURIComponent(episode.url)}&name=${encodeURIComponent(episode.name)}&poster=${encodeURIComponent(video.value.vod_pic)}`
  })
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
}

.content {
  padding: 20rpx;
}

.poster {
  width: 100%;
  height: 500rpx;
  border-radius: 16rpx;
  background: #2a2a2a;
  margin-bottom: 30rpx;
}

.video-info {
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.video-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15rpx;
}

.video-remarks {
  display: block;
  font-size: 24rpx;
  color: #e50914;
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  margin-bottom: 12rpx;
}

.info-label {
  width: 120rpx;
  font-size: 26rpx;
  color: #999;
}

.info-value {
  flex: 1;
  font-size: 26rpx;
  color: #fff;
}

.plot-section {
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20rpx;
}

.plot-text {
  font-size: 28rpx;
  color: #ccc;
  line-height: 1.8;
}

.episodes-section {
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.episodes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.episode-item {
  padding: 15rpx 30rpx;
  background: rgba(229, 9, 20, 0.2);
  border-radius: 8rpx;
  border: 1px solid rgba(229, 9, 20, 0.5);
}

.episode-text {
  font-size: 26rpx;
  color: #e50914;
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
