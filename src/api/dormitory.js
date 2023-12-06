import request from '@/utils/request'

export function addBookmark(id, username) {
  return request({
    url: 'http://localhost:8443/api/setBookMark?dormitoryId=222&username=bbb',
    method: 'post'
  })
}
