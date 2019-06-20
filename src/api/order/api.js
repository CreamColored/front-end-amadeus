import * as api from '../request'

//根据studentId分页查询订单历史
export const findOrderInfoByStudentId = (studentId, currentPage, pageSize) => api.requestGet(api.webUrl + '/api/order/findOrderInfoByStudentId/' + studentId + '/' + currentPage + '/' + pageSize)
