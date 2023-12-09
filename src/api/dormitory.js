import request from '@/utils/request'

export function addBookmark(id, username) {
  return request({
    url: `http://localhost:8443/api/setBookMark?dormitoryId=${id}&username=${username}`,
    method: 'post'
  })
}

export function findDorm(houseNum, floor, buildingName, location) {
  return request({
    url: `http://localhost:8443/api/findDorm?houseNum=${houseNum}&floor=${floor}&buildingName=${buildingName}&location=${location}`,
    method: 'post'
  })
}
