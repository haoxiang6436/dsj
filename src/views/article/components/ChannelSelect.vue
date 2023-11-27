<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in ChannelList"
      :key="item.id"
      :value="item.id"
      :label="item.cate_name"
    ></el-option>
  </el-select>
</template>

<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref } from 'vue'
defineProps(['modelValue', 'width'])
const emit = defineEmits(['update:modelValue'])
const ChannelList = ref([])
const getChannelList = async () => {
  const { data } = await artGetChannelService()
  ChannelList.value = data.data
}
getChannelList()
</script>
