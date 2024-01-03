import request from '@/utils/request'

export function findDorm(houseNum, floor, buildingName, location) {
  return request({
    url: `http://8.138.84.46:8443/api/findDorm?houseNum=${houseNum}&floor=${floor}&buildingName=${buildingName}&location=${location}`,
    method: 'post'
  })
}

export function findBuilding(location) {
  return request({
    url: `http://8.138.84.46:8443/api/findBuilding?location=${location}`,
    method: 'post'
  })
}

export function findFloor(location, building) {
  return request({
    url: `http://8.138.84.46:8443/api/findFloor?location=${location}&buildingName=${building}`,
    method: 'post'
  })
}

export function findRoom(floor, building, location) {
  return request({
    url: `http://8.138.84.46:8443/api/findDorm?floor=${floor}&buildingName=${building}&location=${location}`,
    method: 'post'
  })
}

export function addBookmark(id, username) {
  return request({
    url: `http://8.138.84.46:8443/api/setBookMark?dormitoryId=${id}&username=${username}`,
    method: 'post'
  })
}

export function addParentComment(username, dormId, content) {
  return request({
    url: `http://8.138.84.46:8443/api/setComment?username=${username}&dormitoryId=${dormId}&content=${content}`,
    method: 'post'
  })
}

export function addChildComment(username, dormId, content, parentId) {
  return request({
    url: `http://8.138.84.46:8443/api/setComment?username=${username}&dormitoryId=${dormId}&content=${content}&parentId=${parentId}`,
    method: 'post'
  })
}

export function deleteComment(commentId) {
  return request({
    url: `http://8.138.84.46:8443/api/admin/deleteComment?comment_id=${commentId}`,
    method: 'post'
  })
}

export function getCommentTree(dormId) {
  return request({
    url: `http://8.138.84.46:8443/api/treeOfComments?dormitory_id=${dormId}`,
    method: 'post'
  })
}

