import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: 'api/findDorm',
//     method: 'get',
//     params: query
//   })
// }
export function Login(data) {
  return request({
    url: `http://localhost:8443/api/login`,
    method: 'post',
    data
  })
}

export function Register(data) {
  return request({
    url: `http://localhost:8443/api/register`,
    method: 'post',
    data
  })
}

export function gerProfile(data) {
  return request({
    url: `http://localhost:8443/api/getUser?username=${data}`,
    method: 'post'
  })
}
export function recommend(data) {
  return request({
    url: `http://localhost:8443/api/recommend?username=${data}`,
    method: 'post'
  })
}

export function fetchList(query) {
  const houseNumParam = query.houseNum ? `houseNum=${query.houseNum}` : ''
  const floorParam = query.floor ? `floor=${query.floor}` : ''
  const buildingNameParam = query.buildingName ? `buildingName=${query.buildingName}` : ''
  const locationParam = query.location ? `location=${query.location}` : ''
  const sortParam = query.sort === '-' ? '-' : '%2B'
  const userParam = query.username ? `username=${query.username}` : ''

  const url = `http://localhost:8443/api/findDorm?sort=${sortParam}&page=${query.page}&limit=${query.limit}&${houseNumParam}&${floorParam}&${buildingNameParam}&${locationParam}&${userParam}`
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
  url += `?dormitoryId=${query.id}&username=${query.user}`
  return request({
    url: url,
    method: 'post'
  })
}

export function exchangeRoom(query) {
  var url = `http://localhost:8443/api/exchangeApply?username=${query.username}&to=${query.to}`
  return request({
    url: url,
    method: 'post'
  })
}

export function checkUser(query) {
  var url = `http://localhost:8443/api/checkUserIsCheckedIn?username=${query}`
  return request({
    url: url,
    method: 'post'
  })
}

export function checkTime(query) {
  var url = `http://localhost:8443/api/checkTime?username=${query}`
  return request({
    url: url,
    method: 'post'
  })
}

export function getDormUsers(query) {
  var url = `http://localhost:8443/api/getRoomCheckInedUsers?dormitoryid=${query}`
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

export function checkOutUser(data) {
  var url = `http://localhost:8443/api/checkOutDorm?username=${data.username}&dormitoryid=${data.id}`
  console.log(url)
  return request({
    url: url,
    method: 'post'
  })
}

export function uploadUser(data) {
  var url = 'http://localhost:8443/api/admin/user/register/upload'
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

export function updateUser(data) {
  const url = `http://localhost:8443/api/updateUser`
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  const url = `http://localhost:8443/api/admin/user/deleteUser?username=${data}`
  return request({
    url: url,
    method: 'post'
  })
}

export function fetchTimeList(query) {
  const genderParam = query.gender ? `${query.gender}` : ''
  const degreeParam = query.degree ? `${query.degree}` : ''
  const url = `http://localhost:8443/api/getSelectionTime?gender=${genderParam}&degree=${degreeParam}`
  return request({
    url: url,
    method: 'post'
    // params: query
  })
}

export function setTimeInterval(data) {
  const url = 'http://localhost:8443/api/admin/setSelectionTime'
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function deleteTimeInterval(data) {
  const url = 'http://localhost:8443/api/admin/deleteSelectionTime'
  return request({
    url: url,
    method: 'post',
    data
  })
}

