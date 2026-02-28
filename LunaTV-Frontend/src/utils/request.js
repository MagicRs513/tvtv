import config from '../config/config'

function request(options) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')
    
    uni.request({
      url: config.baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      timeout: options.timeout || config.timeout,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          uni.showToast({ title: '请先登录', icon: 'none' })
          setTimeout(() => {
            uni.removeStorageSync('token')
            uni.redirectTo({ url: '/pages/login/login' })
          }, 1500)
          reject(res)
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        console.error('请求错误:', err)
        uni.showToast({ title: '网络错误', icon: 'none' })
        reject(err)
      }
    })
  })
}

export default request
