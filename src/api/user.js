import request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetUserInfoService = () => request.get('/my/userinfo')

// 更新用户信息
export const userPutUserInfoService = (data) =>
  request.put('/my/userinfo', data)
// 更新头像
export const userUpdateService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
// 重置密码
export const userResetPwdService = (data) =>
  request.patch('/my/updatepwd', data)
