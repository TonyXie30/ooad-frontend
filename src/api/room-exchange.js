import request from '@/utils/request'
export function exchangeAccept(userName, from) {
  return request({
    url: `http://8.138.84.46:8443/api/exchangeAccept?username=${userName}&from=${from}`,
    method: 'post'
  })
}

export function exchangeReject(userName, from) {
  return request({
    url: `http://8.138.84.46:8443/api/exchangeReject?username=${userName}&from=${from}`,
    method: 'post'
  })
}
