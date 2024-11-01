import { createRouter } from 'vue-router'
// import { createWebHistory } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// import { userGetUserInfoService } from '@/api/user.js'
/**
 *
 * createRouter 创建路由实例
 * 配置 history 模式
 * 1. history模式：createWebHistory 地址栏不带 #
 * 2. hash模式：createWebHashHistory 地址栏不带 #
 *
 * vite 中的环境变量 import.meta.env.BASE_URL 就是vite.config.js 中的base配置项
 */
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/channel',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassWord.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        }
      ]
    }
  ]
})
// 路由守卫
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    console.log('未登录')
    return '/login'
  }
})

export default router
