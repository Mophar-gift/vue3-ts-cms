<template>
  <div class="department">
    <page-search
      ref="pageSearchRef"
      :search-config="searchConfig"
      @search-click="handleSearchClick"
      @reset-click="handleResetClick"
    />

    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new-click="handleAddNewClick"
      @page-change="handlePageChange"
      @pag-size-change="handlePageSizeChange"
    >
      <template #createAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #action="scope">
        <el-button
          v-if="isEdit"
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
            <el-button
              v-if="isDel"
              class="action-btn"
              text
              type="danger"
              size="small"
              icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </page-content>

    <page-model
      ref="pageModelRef"
      :model-config="modelConfigCpt"
      @update-page-data="handleUpdatePageData"
    />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import useCommonStore from '@/stores/main/common/common'
import useSystemStore from '@/stores/main/system/system'

import useBtnPermissions from '@/hooks/useBtnPermissions'

import { ElMessage } from 'element-plus'
import { formatUTC } from '@/utils/format'
import { computed, ref } from 'vue'

// - store
const commonStore = useCommonStore()
const systemStore = useSystemStore()

// - data
const pageSearchRef = ref<InstanceType<typeof PageSearch>>()
const isDel = useBtnPermissions('department:delete')
const isEdit = useBtnPermissions('department:update')

// - hooks
const { pageContentRef, handleResetClick, handleSearchClick, handleUpdatePageData } =
  usePageContent()
const { pageModelRef, handleAddNewClick, handleEditClick } = usePageModel()

// - computed
// 初始化选择框异步选项数据
const modelConfigCpt = computed(() => {
  const departments = commonStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id + '' }
  })

  modelConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })

  return modelConfig
})

// - methods
const handleDeleteClick = (payload) => {
  systemStore.deletePageDataAction(contentConfig.pageName, payload.id).then((res) => {
    if (res.code === 0) {
      // 更新页面数据
      pageContentRef.value?.fetchPageData()
      pageContentRef.value?.updateCommonData()

      ElMessage.success('删除部门成功')
    } else {
      ElMessage.error('删除部门失败')
    }
  })
}

// 用于解决换页问题
const handlePageChange = () => {
  pageContentRef.value?.fetchPageDataByPag(pageSearchRef.value?.formData)
}
const handlePageSizeChange = () => {
  pageContentRef.value?.fetchPageDataByPag(pageSearchRef.value?.formData)
}
</script>

<style scoped>
.department {
  border-radius: 15px;
  overflow: hidden;
}
</style>
