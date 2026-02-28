import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(uni.getStorageSync('token') || '')
  const username = ref(uni.getStorageSync('username') || '')
  const isLoggedIn = computed(() => !!token.value)

  function setToken(newToken) {
    token.value = newToken
    uni.setStorageSync('token', newToken)
  }

  function setUsername(newUsername) {
    username.value = newUsername
    uni.setStorageSync('username', newUsername)
  }

  function logout() {
    token.value = ''
    username.value = ''
    uni.removeStorageSync('token')
    uni.removeStorageSync('username')
  }

  return {
    token,
    username,
    isLoggedIn,
    setToken,
    setUsername,
    logout
  }
})
