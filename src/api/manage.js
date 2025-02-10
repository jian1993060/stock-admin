import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}

/**
 * 会员管理列表
 * @param {*} parameter
 * @returns
 */
export function memberList (parameter) {
    return request({
        url: '/user/list',
        method: 'post',
        data: parameter
    })
}

/**
 * 提现列表
 * @param {*} parameter
 * @returns
 */
export function withdrawList (parameter) {
    return request({
        url: '/withdraw/list',
        method: 'post',
        data: parameter
    })
}
/**
 * 提现
 * @param {*} parameter
 * @returns
 */
export function withdrawFinish (parameter) {
    return request({
        url: '/withdraw/finish',
        method: 'post',
        data: parameter
    })
}

/**
 * 实名
 * @param {*} parameter
 * @returns
 */
export function realList (parameter) {
  return request({
      url: '/real/list',
      method: 'post',
      data: parameter
  })
}

export function realFinish (parameter) {
  return request({
      url: '/real/finish',
      method: 'post',
      data: parameter
  })
}


export function rechargeList (parameter) {
    return request({
        url: '/recharge/list ',
        method: 'post',
        data: parameter
    })
}

/**
 * 订单列表
 * @param {*} parameter
 * @returns
 */
export function orderList (parameter) {
    return request({
        url: 'back/order/list',
        method: 'post',
        data: parameter
    })
}

/**
 * 公告
 * @param {*} parameter
 * @returns
 */
export function createNotice (parameter) {
    return request({
        url: 'back/notice/add',
        method: 'post',
        data: parameter
    })
}

export function listNotice (parameter) {
    return request({
        url: 'back/notice/list',
        method: 'post',
        data: parameter
    })
}

export function listProduct (parameter) {
  return request({
    url: 'back/product/list',
    method: 'post',
    data: parameter
  })
}

export function addProduct (parameter) {
  return request({
    url: 'back/product/add',
    method: 'post',
    data: parameter
  })
}

export function saveProduct (parameter) {
  return request({
    url: parameter && parameter.id ? 'back/product/update' : 'back/product/add',
    method: 'post',
    data: parameter
  })
}
export function delProduct (parameter) {
  return request({
    url: 'back/product/del',
    method: 'post',
    data: parameter
  })
}

export function rechargeReview (parameter) {
    return request({
        url: 'back/recharge/finish',
        method: 'post',
        data: parameter
    })
}

export function typeInfo (parameter) {
    return request({
        url: 'back/type/info/id',
        method: 'post',
        data: parameter
    })
}

export function upUserStatus (parameter) {
  return request({
      url: 'back/user/up/status/'+parameter,
      method: 'post'
  })
}
export function updatePwd (parameter) {
  return request({
      url: 'back/update/pwd',
      method: 'post',
      data: parameter
  })
}
export function OperationRecords (parameter) {
  return request({
      url: 'back/logInfo/list',
      method: 'post',
      data: parameter
  })
}

export function delNotice (parameter) {
  return request({
      url: 'back/notice/del/'+parameter,
      method: 'post'
  })
}
export function userUpdate (parameter) {
  return request({
      url: 'back/user/update',
      method: 'post',
      data: parameter
  })
}
