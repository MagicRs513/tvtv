const apiConfig = {
  baseURL: process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://your-lunatv-domain.com/api',
  timeout: 30000
}

export default apiConfig
