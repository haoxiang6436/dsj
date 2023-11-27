<template>
  <PageContainer title="基本资料">
    <el-form ref="ElFromItem" size="large" :model="userInfo" :rules="formRules">
      <el-form-item label="登录名称">
        <el-input disabled :value="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="onSubmit" :loading="submitting" type="primary">
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userPutUserInfoService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const userInfo = ref({ ...userStore.userInfo })
const formRules = {
  nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入有效的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
}
const ElFromItem = ref()
const submitting = ref(false)

const onSubmit = async () => {
  await ElFromItem.value.validate()
  try {
    submitting.value = true
    const { data } = await userPutUserInfoService(userInfo.value)
    userStore.getUserInfo()
    ElMessage.success(data.message)
  } catch (error) {
    console.error('Failed to submit form', error)
    ElMessage.error('表单提交失败，请重试。')
  } finally {
    submitting.value = false
  }
}
</script>
