import axios from 'axios'
import { useUserStore } from '@/stores/index.js'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  // 基础地址、超时时间
  baseURL,
  timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 0) {
      return response
    }
    ElMessage.error(response.data.message || '服务器繁忙')
    return Promise.reject(response.data)
  },
  function (error) {
    if (error.response?.status === 401) {
      router.push('/login')
      ElMessage.error(error.response.data.message || '服务器繁忙')
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error.response.data.message || '服务器繁忙')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
