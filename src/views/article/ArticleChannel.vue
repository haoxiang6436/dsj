<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelService, artDelChannelService } from '@/api/article.js'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
//
const tableData = ref([])
const isLoading = ref(false)
const getChannel = async () => {
  isLoading.value = true
  const { data } = await artGetChannelService()
  console.log(data.data)
  tableData.value = data.data
  isLoading.value = false
}
getChannel()
const edit = ref()
const channelDel = async ({ row }) => {
  await ElMessageBox.confirm('你确定要删除吗？', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  await artDelChannelService(row.id)
  setTimeout(getChannel, 500)
}
const channelEdit = (scope) => {
  edit.value.open(scope)
}
const channelAddEdit = () => {
  edit.value.open({})
}
const onSuccess = () => {
  getChannel()
}
</script>
<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="channelAddEdit">添加分类</el-button>
    </template>
    <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100px" />
      <el-table-column prop="cate_name" label="分类名" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="" label="操作" width="100px">
        <template #default="scope">
          <el-button
            type="success"
            :icon="Edit"
            circle
            @click="channelEdit(scope)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="channelDel(scope)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <ChannelEdit ref="edit" @success="onSuccess"></ChannelEdit>
  </PageContainer>
</template>
