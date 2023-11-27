<template>
  <PageContainer title="更换头像">
    <el-upload
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="fileChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button @click="onSubmit" :disabled="!imageUrl">上传头像</el-button>
  </PageContainer>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { Plus } from '@element-plus/icons-vue'
import { userUpdateService } from '@/api/user.js'
const userInfo = useUserStore()
const imageUrl = ref(userInfo.userInfo.user_pic || '')
const fileChange = async ({ raw }) => {
  const base = await fileToBase64(raw)
  imageUrl.value = base
}
const onSubmit = async () => {
  const { data } = await userUpdateService(imageUrl.value)
  userInfo.getUserInfo()
  ElMessage.success(data.message)
}
// file转base64
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 设置文件加载完成后的回调函数
    reader.onload = function (event) {
      // event.target.result 包含文件内容的Base64编码字符串
      const base64Data = event.target.result
      resolve(base64Data)
    }

    // 设置文件读取失败的回调函数
    reader.onerror = function (error) {
      reject(error)
    }

    // 读取文件并以DataURL形式返回
    reader.readAsDataURL(file)
  })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 300px;
  height: 300px;
  display: block;
}
.el-button {
  margin: 20px 0px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  text-align: center;
}
</style>
