import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: 'api/findDorm',
//     method: 'get',
//     params: query
//   })
// }

export function fetchList(query) {
  const houseNumParam = query.houseNum ? `houseNum=${query.houseNum}` : ''
  const floorParam = query.floor ? `floor=${query.floor}` : ''
  const buildingNameParam = query.buildingName ? `buildingName=${query.buildingName}` : ''
  const locationParam = query.location ? `location=${query.location}` : ''
  const sortParam = query.sort === '-' ? '-' : '%2B'

  const url = `http://localhost:8443/api/findDorm?sort=${sortParam}&page=${query.page}&limit=${query.limit}&${houseNumParam}&${floorParam}&${buildingNameParam}&${locationParam}`
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

export function createDorm(data) {
  return request({
    url: 'http://localhost:8443/api/admin/addDormitory',
    method: 'post',
    data
  })
}

export function deleteDorm(data) {
  var url = 'http://localhost:8443/api/admin/removeDormitory'
  return request({
    url: url,
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

export function fetchUserList(query) {
  // const IDParam = query.ID ? `ID=${query.ID}` : ''
  // const genderParam = query.gender ? `gender=${query.gender}` : ''
  // const subjectParam = query.subjectName ? `subject=${query.subject}` : ''
  const sortParam = query.sort === '-' ? '-' : '%2B'

  const url = `http://localhost:8443/api/getUsers?sort=${sortParam}&page=${query.page}&limit=${query.limit}`
  return request({
    url: url,
    method: 'post'
    // params: query
  })
}
