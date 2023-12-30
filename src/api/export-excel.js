import request from '@/utils/request'

export function exportExcel(fileName) {
  return request({
    url: `http://localhost:8443/api/admin/selectionInfo/export?fileName=${fileName}`,
    method: 'post',
    responseType: 'blob'
  })
}
