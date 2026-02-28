import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(uni.getStorageSync('token') || '')
  const username = ref(uni.getStorageSync('username') || '')
  
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
  
  const isLoggedIn = () => !!token.value
  
  return {
    token,
    username,
    setToken,
    setUsername,
    logout,
    isLoggedIn
  }
})
