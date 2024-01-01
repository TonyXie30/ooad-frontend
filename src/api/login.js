import request from '@/utils/request'
export function getVerification() {
  return request({
    url: 'https://www.mxnzp.com/api/verifycode/code?len=4&type=0&app_id=oniunksithqjnuus&app_secret=Y5uPhQuE13MrkzHgufmLDZMCDJXrrf5I',
    method: 'get'
  })
}
