const apiConfig = {
  baseURL: process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://any.lumi210.ggff.net/api',
  timeout: 30000
}

export default apiConfig
