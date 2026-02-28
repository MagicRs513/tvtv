import request from '../utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { username, password }
  })
}

export function getVideos(page = 1, limit = 20) {
  return request({
    url: '/videos',
    method: 'GET',
    data: { page, limit }
  })
}

export function searchVideos(keyword, page = 1) {
  return request({
    url: '/search',
    method: 'GET',
    data: { q: keyword, page }
  })
}

export function getVideoDetail(id) {
  return request({
    url: `/videos/${id}`,
    method: 'GET'
  })
}

export function getVideoPlayUrl(id, episode = 1) {
  return request({
    url: `/videos/${id}/play`,
    method: 'GET',
    data: { episode }
  })
}

export function getCategories() {
  return request({
    url: '/categories',
    method: 'GET'
  })
}

export function getFavorites() {
  return request({
    url: '/favorites',
    method: 'GET'
  })
}

export function addFavorite(videoId) {
  return request({
    url: '/favorites',
    method: 'POST',
    data: { videoId }
  })
}

export function removeFavorite(id) {
  return request({
    url: `/favorites/${id}`,
    method: 'DELETE'
  })
}
