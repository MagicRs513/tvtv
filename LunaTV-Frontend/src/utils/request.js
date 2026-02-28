import axios from 'axios'
import apiConfig from '../config/api'
import { useUserStore } from '../stores/user'

const service = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout
})

service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('响应错误:', error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          uni.showToast({ title: '未授权', icon: 'none' })
          break
        case 403:
          uni.showToast({ title: '禁止访问', icon: 'none' })
          break
        case 404:
          uni.showToast({ title: '请求资源不存在', icon: 'none' })
          break
        case 500:
          uni.showToast({ title: '服务器错误', icon: 'none' })
          break
        default:
          uni.showToast({ title: error.response.data.message || '请求失败', icon: 'none' })
      }
    } else if (error.request) {
      uni.showToast({ title: '网络错误', icon: 'none' })
    } else {
      uni.showToast({ title: '请求配置错误', icon: 'none' })
    }
    return Promise.reject(error)
  }
)

export default service
