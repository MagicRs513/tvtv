<template>
  <view class="login-page">
    <view class="login-container">
      <view class="logo-section">
        <text class="logo-text">LunaTV</text>
        <text class="logo-subtitle">电视版</text>
      </view>
      
      <view class="form-container">
        <view class="form-item">
          <text class="form-label">用户名</text>
          <input 
            class="form-input" 
            v-model="formData.username" 
            placeholder="请输入用户名"
            placeholder-style="color: #666"
            focus
          />
        </view>
        
        <view class="form-item">
          <text class="form-label">密码</text>
          <input 
            class="form-input" 
            v-model="formData.password" 
            type="password"
            placeholder="请输入密码"
            placeholder-style="color: #666"
          />
        </view>
        
        <button 
          class="login-btn" 
          :disabled="loading" 
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'
import { login } from '../../src/api/video'
import { useUserStore } from '../../src/stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    const formData = ref({
      username: '',
      password: ''
    })
    const loading = ref(false)
    
    const handleLogin = async () => {
      if (!formData.value.username || !formData.value.password) {
        uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
        return
      }
      
      loading.value = true
      
      try {
        const res = await login(formData.value.username, formData.value.password)
        
        if (res.token) {
          userStore.setToken(res.token)
          userStore.setUsername(formData.value.username)
          
          uni.showToast({ title: '登录成功', icon: 'success' })
          
          setTimeout(() => {
            uni.reLaunch({ url: '/pages/index/index' })
          }, 1500)
        } else {
          uni.showToast({ title: '登录失败', icon: 'none' })
        }
      } catch (error) {
        console.error('登录失败:', error)
        uni.showToast({ title: '登录失败，请检查网络', icon: 'none' })
      } finally {
        loading.value = false
      }
    }
    
    return {
      formData,
      loading,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 600rpx;
  padding: 80rpx 60rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo-text {
  display: block;
  font-size: 80rpx;
  font-weight: bold;
  color: #e50914;
  letter-spacing: 10rpx;
  margin-bottom: 20rpx;
}

.logo-subtitle {
  display: block;
  font-size: 32rpx;
  color: #ffffff;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}

.form-label {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: bold;
}

.form-input {
  padding: 25rpx 30rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.15);
  font-size: 32rpx;
  color: #ffffff;
}

.login-btn {
  margin-top: 40rpx;
  height: 90rpx;
  background: linear-gradient(135deg, #e50914 0%, #b2070f 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  border-radius: 12rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:disabled {
  opacity: 0.6;
}
</style>
