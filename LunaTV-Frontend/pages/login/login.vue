<template>
  <view class="login-container">
    <view class="login-card">
      <view class="logo-section">
        <text class="logo-text">LunaTV</text>
        <text class="logo-subtitle">影视聚合播放站</text>
      </view>

      <view class="form-section">
        <view class="form-item">
          <uni-icons type="person" size="20" color="#999"></uni-icons>
          <input
            class="form-input"
            v-model="formData.username"
            placeholder="请输入用户名"
            placeholder-style="color: #999"
          />
        </view>

        <view class="form-item">
          <uni-icons type="locked" size="20" color="#999"></uni-icons>
          <input
            class="form-input"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            placeholder-style="color: #999"
          />
        </view>

        <button
          class="login-btn"
          :disabled="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <view class="tips-section">
          <text class="tips-text">首次使用请联系管理员获取账号</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../../src/api/auth'
import { useUserStore } from '../../src/stores/user'

const userStore = useUserStore()

const formData = ref({
  username: '',
  password: ''
})

const loading = ref(false)

async function handleLogin() {
  if (!formData.value.username || !formData.value.password) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }

  loading.value = true

  try {
    const response = await login(formData.value.username, formData.value.password)
    
    if (response.token) {
      userStore.setToken(response.token)
      userStore.setUsername(formData.value.username)
      
      uni.showToast({ title: '登录成功', icon: 'success' })
      
      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' })
      }, 1500)
    } else {
      uni.showToast({ title: '登录失败，请检查账号密码', icon: 'none' })
    }
  } catch (error) {
    console.error('登录失败:', error)
    
    if (error.response?.status === 401) {
      uni.showToast({ title: '用户名或密码错误', icon: 'none' })
    } else if (error.response?.status === 500) {
      uni.showToast({ title: '服务器错误，请稍后重试', icon: 'none' })
    } else {
      uni.showToast({ title: '登录失败，请检查网络连接', icon: 'none' })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.login-card {
  width: 100%;
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24rpx;
  padding: 80rpx 60rpx;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo-text {
  display: block;
  font-size: 72rpx;
  font-weight: bold;
  color: #e50914;
  letter-spacing: 8rpx;
  margin-bottom: 20rpx;
}

.logo-subtitle {
  display: block;
  font-size: 28rpx;
  color: #999;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12rpx;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-input {
  flex: 1;
  font-size: 32rpx;
  color: #fff;
}

.login-btn {
  margin-top: 40rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #e50914 0%, #b2070f 100%);
  color: #fff;
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

.login-btn:not(:disabled):active {
  transform: scale(0.98);
}

.tips-section {
  text-align: center;
  margin-top: 40rpx;
}

.tips-text {
  font-size: 24rpx;
  color: #666;
}
</style>
