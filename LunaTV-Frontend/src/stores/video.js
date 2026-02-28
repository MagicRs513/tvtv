import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchVideo, getVideoDetail } from '@/api/video'

export const useVideoStore = defineStore('video', () => {
  const searchResults = ref([])
  const currentVideo = ref(null)
  const currentDetail = ref(null)
  const loading = ref(false)

  async function performSearch(keyword) {
    loading.value = true
    try {
      const response = await searchVideo(keyword)
      searchResults.value = response.results || []
    } catch (error) {
      console.error('搜索失败:', error)
      uni.showToast({ title: '搜索失败', icon: 'none' })
    } finally {
      loading.value = false
    }
  }

  async function fetchVideoDetail(id, source) {
    loading.value = true
    try {
      const response = await getVideoDetail(id, source)
      currentDetail.value = response
    } catch (error) {
      console.error('获取视频详情失败:', error)
      uni.showToast({ title: '获取详情失败', icon: 'none' })
    } finally {
      loading.value = false
    }
  }

  function setCurrentVideo(video) {
    currentVideo.value = video
  }

  function clearSearchResults() {
    searchResults.value = []
  }

  return {
    searchResults,
    currentVideo,
    currentDetail,
    loading,
    performSearch,
    fetchVideoDetail,
    setCurrentVideo,
    clearSearchResults
  }
})
