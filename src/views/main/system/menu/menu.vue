<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new-click="handleAddNewClick"
    >
      <template #createAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #action="scope">
        <el-button
          class="action-btn"
          text
          type="primary"
          size="small"
          icon="Edit"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>

        <el-popconfirm title="确定要删除吗？" @confirm="handleDeleteClick(scope.row)">
          <template #reference>
            <el-button class="action-btn" text type="danger" size="small" icon="Delete">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </page-content>

    <page-model
      :model-config="modelConfig"
      ref="pageModelRef"
      @update-page-data="handleUpdatePageData"
    />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import useSystemStore from '@/stores/main/system/system'

import { ElMessage } from 'element-plus'
import { formatUTC } from '@/utils/format'

// - store
const systemStore = useSystemStore()

// - hooks
const { pageContentRef, handleUpdatePageData } = usePageContent()
const { pageModelRef, handleAddNewClick, handleEditClick } = usePageModel()

// - methods
const handleDeleteClick = (payload) => {
  systemStore.deletePageDataAction(contentConfig.pageName, payload.id).then((res) => {
    if (res.code === 0) {
      // 更新页面数据
      pageContentRef.value?.fetchPageData()
      pageContentRef.value?.updateCommonData()

      ElMessage.success('删除菜单成功')
    } else {
      ElMessage.error('删除菜单失败')
    }
  })
}
</script>

<style scoped lang="less">
.menu {
}
</style>
