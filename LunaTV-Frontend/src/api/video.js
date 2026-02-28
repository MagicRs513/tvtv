import request from '../utils/request'

export function searchVideo(keyword) {
  return request({
    url: '/search',
    method: 'get',
    params: { q: keyword }
  })
}

export function getVideoDetail(id, source) {
  return request({
    url: '/detail',
    method: 'get',
    params: { id, source }
  })
}

export function getDoubanDetail(id) {
  return request({
    url: '/douban/details',
    method: 'get',
    params: { id }
  })
}

export function getCategories() {
  return request({
    url: '/source-browser/categories',
    method: 'get'
  })
}

export function getSourceList() {
  return request({
    url: '/source-browser/list',
    method: 'get'
  })
}

export function getFavorites(params) {
  return request({
    url: '/favorites',
    method: 'get',
    params
  })
}

export function addFavorite(data) {
  return request({
    url: '/favorites',
    method: 'post',
    data
  })
}

export function removeFavorite(id) {
  return request({
    url: `/favorites/${id}`,
    method: 'delete'
  })
}
