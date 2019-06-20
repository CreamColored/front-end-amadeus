import * as api from '../request'

//查询全部管理员信息
export const findAllAdminInfo = () => api.requestGet(api.webUrl + '/api/admin/findAll')

//修改管理员状态
export const updateAccountState = (params) => api.requestPut(api.webUrl + '/api/admin/updateAccountState?' + params)

//删除管理员
export const deleteAdminInfo = (id) => api.requestDelete(api.webUrl + '/api/admin/delete/' + id)

//添加管理员
export const addAdminInfo = (params) => api.requestPost(api.ssoUrl + '/api/sso/saveAdmin?' + params)

