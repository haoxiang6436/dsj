<template>
  <el-dialog
    v-model="dialogVisible"
    :title="fromModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form :model="fromModel" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="fromModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="fromModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'
const formRef = ref()
const dialogVisible = ref(false)
const fromModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '1-10位字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入别名', trigger: 'blur' },
    {
      pattern: /^\S[a-zA-Z0-9]{1,15}$/,
      message: '1-15位大小写字母数字',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
const open = ({ row }) => {
  fromModel.value = { ...row }
  dialogVisible.value = true
}
const submit = async () => {
  await formRef.value.validate()
  if (!fromModel.value.id) {
    await artAddChannelService(fromModel.value)
  } else {
    await artEditChannelService(fromModel.value)
  }
  dialogVisible.value = false
  emit('success')
}
defineExpose({
  open
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
