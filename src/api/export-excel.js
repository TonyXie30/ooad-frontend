import request from '@/utils/request'

export function exportExcel(fileName) {
  return request({
    url: `http://8.138.84.46:8443/api/admin/selectionInfo/export?fileName=${fileName}`,
    method: 'post',
    responseType: 'blob'
  })
}
