import request from '@/utils/request'

export function getMailBox(username) {
  return request({
    url: `http://localhost:8443/api/checkMailbox?username=${username}`,
    method: 'post'
  })
}
