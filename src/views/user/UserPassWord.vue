<template>
  <PageContainer title="修改密码">
    <el-form
      ref="ElFromItem"
      size="large"
      :model="fromModel"
      :rules="formRules"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="fromModel.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="fromModel.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="fromModel.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="onSubmit" :loading="submitting">修改密码</el-button>
        <el-button @click="ElFromItem.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<script setup>
import { ref } from 'vue'
import { userResetPwdService } from '@/api/user.js'
const defFromModel = {
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
}
const fromModel = ref({
  ...defFromModel
})
const ElFromItem = ref()
const checkPasswordMatch = (rule, value, callback) => {
  if (value !== fromModel.value.new_pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const formRules = {
  old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: '只能包含大小写字母和数字',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: checkPasswordMatch, trigger: 'blur' }
  ]
}
const submitting = ref(false)
const onSubmit = async () => {
  await ElFromItem.value.validate()
  try {
    submitting.value = true
    const { data } = await userResetPwdService(fromModel.value)
    ElMessage.success(data.message)
    ElFromItem.value.resetFields()
  } catch (error) {
    ElMessage.error('提交失败')
  } finally {
    submitting.value = false
  }
}
</script>
