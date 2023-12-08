import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: 'api/findDorm',
//     method: 'get',
//     params: query
//   })
// }

export function fetchList(query) {
  // const queryParams = {}

  // if (query.houseNum !== undefined) {
  //   queryParams.houseNum = query.houseNum
  // }

  // if (query.floor !== undefined) {
  //   queryParams.floor = query.floor
  // }

  // if (query.buildingName !== undefined) {
  //   queryParams.buildingName = query.buildingName
  // }

  // if (query.location !== undefined) {
  //   queryParams.location = query.location
  // }
  // const queryString = Object.entries(queryParams)
  //   .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //   .join('&')
  const houseNumParam = query.houseNum !== undefined && query.houseNum !== null ? `houseNum=${query.houseNum}` : ''
  const floorParam = query.floor !== undefined && query.floor !== null ? `floor=${query.floor}` : ''
  const buildingNameParam = query.buildingName !== undefined && query.buildingName !== null ? `buildingName=${query.buildingName}` : ''
  const locationParam = query.location !== undefined && query.location !== null ? `location=${query.location}` : ''

  const url = `http://localhost:8443/api/findDorm?${houseNumParam}&${floorParam}&${buildingNameParam}&${locationParam}`
  // const url = `http://localhost:8443/api/findDorm?houseNum=${query.houseNum}&floor=${query.floor}&buildingName=${query.buildingName}&location=${query.location}`
  return request({
    url: url,
    method: 'post'
    // params: query
  })
}

export function findBuilding(query) {
  var url = `http://localhost:8443/api/findBuilding`
  if (query.location) {
    url += `?location=${query.location}`
  }
  return request({
    url: url,
    method: 'post'
  })
}

export function findFloor(query) {
  var url = 'http://localhost:8443/api/findFloor'
  if (query.location) {
    url += `?location=${query.location}`
    if (query.buildingName) {
      url += `&buildingName=${query.buildingName}`
    }
  } else if (query.buildingName) {
    url += `?buildingName=${query.buildingName}`
  }
  return request({
    url: url,
    method: 'post'
  })
}

export function selectRoom(query) {
  var url = 'http://localhost:8443/api/checkInDorm'
  url += `?dormitoryId=${query.id}&username=aaa`
  return request({
    url: url,
    method: 'post'
  })
}

export function deleteRoom(query) {
  var url = 'http://localhost:8443/api/checkInDorm'
  url += `?dormitoryId=${query.id}&username=aaa`
  return request({
    url: url,
    method: 'post'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
