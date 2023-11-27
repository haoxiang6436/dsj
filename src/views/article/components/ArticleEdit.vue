<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form>
      <el-form-item label="文章标题">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="文章分类">
        <ChannelSelect
          v-model:model-value="formModel.cate_id"
          :width="'100%'"
        ></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onChange"
        >
          <img v-if="imgURL" :src="imgURL" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <div class="Edit">
          <QuillEditor
            ref="QuillEditorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')">发布</el-button>
        <el-button @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import {
  artAddArticleService,
  artGetArticleDetailsService,
  artUpdateArticleService
} from '@/api/article.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'
const QuillEditorRef = ref()
const emit = defineEmits(['success'])
const visibleDrawer = ref(false)
const defFormModel = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref({
  ...defFormModel
})
const open = async (row) => {
  visibleDrawer.value = true
  formModel.value = { ...defFormModel }
  imgURL.value = null
  await nextTick()
  QuillEditorRef.value.setHTML('')
  if (row) {
    formModel.value = { ...row }
    const {
      data: { data }
    } = await artGetArticleDetailsService(row.id)
    formModel.value = { ...data }
    imgURL.value = baseURL + data.cover_img
    const file = await imageUrlToFile(imgURL.value, 'image.jpg')
    formModel.value.cover_img = file
  }
}
defineExpose({
  open
})
const imgURL = ref('')
const onChange = (file) => {
  const url = URL.createObjectURL(file.raw)
  imgURL.value = url
  formModel.value.cover_img = file.raw
}
const onPublish = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    const { data } = await artUpdateArticleService(fd)
    ElMessage.success(data.message)
    visibleDrawer.value = false
    emit('success')
  } else {
    const { data } = await artAddArticleService(fd)
    ElMessage.success(data.message)
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
// 网络图片地址，转file对象
async function imageUrlToFile(imageUrl, fileName) {
  try {
    // 使用axios获取网络图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // 将获取的数据转换为Blob对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })

    // 创建File对象
    const file = new File([blob], fileName, {
      type: response.headers['content-type']
    })

    return file
  } catch (error) {
    console.error('Error fetching image:', error)
    throw error
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.Edit {
  width: 100%;

  .ql-editor {
    min-height: 200px !important;
  }
}

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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
