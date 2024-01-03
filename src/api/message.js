import request from '@/utils/request'

export function getMailBox(username) {
  return request({
    url: `http://8.138.84.46:8443/api/checkMailbox?username=${username}`,
    method: 'post'
  })
}

export function deleteNotification(id) {
  return request({
    url: `http://8.138.84.46:8443/api/deleteNotification?notification_id=${id}`,
    method: 'post'
  })
}
