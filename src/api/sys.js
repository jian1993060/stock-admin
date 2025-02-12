import request from '@/utils/request'

export function getStatistics (parameter) {
  return request({
    url: '/data/info',
    method: 'post',
    data: parameter
  })
}
