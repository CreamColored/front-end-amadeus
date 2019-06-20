import * as api from '../request'

//获取全部学生信息
export const findAllStudentInfo = (currentPage, pageSize) => api.requestGet(api.webUrl + '/api/student/findAll/' + currentPage + '/' + pageSize)
//获取全部学生登录信息
export const findAllStudentLogin = () => api.requestGet(api.webUrl + '/api/student/findAllStudentLogin')
//修改学生账户状态
export const updateAccountState = (params) => api.requestPut(api.webUrl + '/api/student/updateAccountState?' + params)
//删除学生账户
export const deleteStudent = (id) => api.requestDelete(api.webUrl + '/api/student/delete/' + id)
//查询总记录数
export const getTotalNumber = () => api.requestGet(api.webUrl + '/api/student/getTotalNumber')
//学生登录
export const login = (params) => api.requestGet(api.ssoUrl + '/api/sso/studentLogin?' + params)
//发送短信验证码
export const sendCode = (telephoneNumber) => api.requestGet(api.ssoUrl + '/api/sso/sendSingleSms?telephoneNumber=' + telephoneNumber)
//学生注册
export const register = (param) => api.requestPost(api.ssoUrl + '/api/sso/studentRegister?' + param)
//学生购买课程
export const addCourse = (studentId, courseId) => api.requestPost(api.webUrl + '/api/student/addCourse/' + studentId + '/' + courseId)
//根据studentId跟courseId判断课程是否已添加
export const hasBought = (studentId, courseId) => api.requestGet(api.webUrl + '/api/student/hasBought/' + studentId + '/' + courseId)
//使用余额购买课程
export const buyCourseByBalance = (balance, studentId) => api.requestPut(api.webUrl + '/api/student/buyCourseByBalance/' + balance + '/' + studentId)
//使用积分购买课程
export const buyCourseByPoint = (point, studentId) => api.requestPut(api.webUrl + '/api/student/buyCourseByPoint/' + point + '/' + studentId)
//学生修改头像
export const updateAvatar = (studentId) => api.requestPut(api.webUrl + '/api/student/uploadImage/' + studentId)
//余额充值
export const recharge = (money, studentId) => api.requestPut(api.webUrl + '/api/student/recharge/' + money + '/' + studentId)
//发表留言
export const comment = (content, courseId, studentId) => api.requestPost(api.webUrl + '/api/student/comment/' + content + '/' + courseId + '/' + studentId)
