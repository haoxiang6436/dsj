import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetUserInfoService } from '@/api/user.js'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null)
    const userInfo = ref({})
    const getUserInfo = async () => {
      const { data } = await userGetUserInfoService()
      userInfo.value = data.data
    }
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = null
      userInfo.value = {}
    }
    return {
      token,
      userInfo,
      setToken,
      removeToken,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
