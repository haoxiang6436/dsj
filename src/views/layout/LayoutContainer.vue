<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import router from '@/router'
const userStore = useUserStore()
userStore.getUserInfo()
//
const commandRouter = (key) => {
  if (key === 'logout') {
    ElMessageBox.confirm('你确定要退出登录吗？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        userStore.removeToken()
        router.push('/login')
      })
      .catch(() => {})
  } else {
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          用户：<strong>{{
            userStore.userInfo.nickname ||
            userStore.userInfo.username ||
            userStore.userInfo.email ||
            '匿名'
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="commandRouter">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main style="overflow-x: hidden">
        <router-view v-slot="{ Component }">
          <transition name="layout" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
/* .layout-leave-active {
  transition: all 5s ease;
} */

/* .layout-enter-from,
.layout-leave-to {
  transform: translateX(500px) scale(0.8);
  opacity: 0;
}
.layout-enter-to,
.layout-leave-from {
  transform: translateX(-500px) scale(0.8);
  opacity: 0;
} */
/*
 */
/* .layout-enter-from,
.layout-enter-to,
.layout-leave-to,
.layout-leave-from {
  transform: scale(0%);
  transform-origin: 0 0;
  opacity: 0;
} */
/*  */
/* .layout-enter-from,
.layout-leave-to {
  transform: translateX(100px);
  transform-origin: 0% 100%;
  opacity: 0;
}

.layout-enter-to,
.layout-leave-from {
  transform-origin: 0% 100%;
} */
.layout-leave-active {
  animation: identifierLeave 1s;
}
.layout-enter-active {
  animation: identifierEnter 1s;
}
@keyframes identifierEnter {
  0% {
    opacity: 0;
    transform: translateY(200px) scale(0.6);
  }
  40% {
    opacity: 1;
    transform: translateY(-0px) scale(0.6);
  }
  60% {
    transform: translateY(-0px) scale(0.6);
  }
  100% {
    transform: translateY(-0px) scale(1);
  }
}
@keyframes identifierLeave {
  0% {
    transform: translateY(-0px) scale(1);
  }
  40% {
    transform: translateY(-0px) scale(0.6);
  }
  60% {
    opacity: 1;
    transform: translateY(-0px) scale(0.6);
  }
  100% {
    opacity: 0;
    transform: translateY(-200px) scale(0.6);
  }
}
</style>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
