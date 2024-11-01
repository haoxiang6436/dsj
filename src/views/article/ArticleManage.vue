<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择分类">
        <ChannelSelect v-model="params.cate_id" />
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
        <!-- <ChannelSelect /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerach">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="ArticleList" width="100%" v-loading="isLoading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="success"
            :icon="Edit"
            circle
            @click="EditArticle(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="DelArticle(row)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      background
      layout="  jumper,total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 抽屉 -->
    <ArticleEdit ref="ArticleEditRef" @success="onSuccess"></ArticleEdit>
  </PageContainer>
</template>
<style lang="scss" scoped>
.el-pagination {
  margin: 20px 0px;
  justify-content: flex-end;
}
</style>
<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetManageService, artDelArticleService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessage } from 'element-plus'
const ArticleEditRef = ref()
const isLoading = ref(false)
const ArticleList = ref([])
const total = ref(1)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const onAddArticle = () => {
  ArticleEditRef.value.open()
}
const EditArticle = (row) => {
  ArticleEditRef.value.open(row)
}
const DelArticle = async (row) => {
  console.log('删除', row)
  const { data } = await artDelArticleService(row.id)
  ElMessage.success(data.message)
  getChannelList()
}
const getChannelList = async () => {
  isLoading.value = true
  const { data } = await artGetManageService(params.value)
  ArticleList.value = data.data
  total.value = data.total
  isLoading.value = false
}
getChannelList()
const onSerach = () => {
  params.value.pagenum = 1
  getChannelList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getChannelList()
}
const handleSizeChange = (size) => {
  console.log('长度', size)
  //
  params.value.pagenum = 1
  params.value.pagesize = size
  getChannelList()
}
const handleCurrentChange = (page) => {
  console.log('页码', page)
  params.value.pagenum = page
  getChannelList()
}
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getChannelList()
}
</script>
