import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addFavorite, removeFavorite, getFavorites } from '../api/video'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])
  const loading = ref(false)

  async function fetchFavorites(params = {}) {
    loading.value = true
    try {
      const response = await getFavorites(params)
      favorites.value = response.data || []
    } catch (error) {
      console.error('获取收藏列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function addToFavorite(videoData) {
    try {
      await addFavorite(videoData)
      await fetchFavorites()
      uni.showToast({ title: '已添加到收藏', icon: 'success' })
    } catch (error) {
      uni.showToast({ title: '收藏失败', icon: 'none' })
    }
  }

  async function removeFromFavorite(id) {
    try {
      await removeFavorite(id)
      await fetchFavorites()
      uni.showToast({ title: '已取消收藏', icon: 'success' })
    } catch (error) {
      uni.showToast({ title: '取消收藏失败', icon: 'none' })
    }
  }

  function isFavorite(videoId) {
    return favorites.value.some(item => item.video_id === videoId)
  }

  return {
    favorites,
    loading,
    fetchFavorites,
    addToFavorite,
    removeFromFavorite,
    isFavorite
  }
})
