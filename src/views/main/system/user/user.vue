<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @search-click="handleSearchClick"
      @reset-click="handleResetClick"
    />

    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new-click="handleAddNewClick"
    >
      <template #createAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row[scope.prop]) }}</template>
      <template #enable="scope">
        <el-switch
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          v-model="scope.row[scope.prop]"
          :active-value="1"
          :inactive-value="0"
          :before-change="handleBeforeSwitchChange"
          @change="handleSwitchChange(scope.row)"
        />
      </template>
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
      :model-config="modelConfigCpt"
      ref="pageModelRef"
      @update-page-data="handleUpdatePageData"
    />
  </div>
</template>

<script setup lang="ts" name="user">
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

import { ElMessage } from 'element-plus'
import { formatUTC } from '@/utils/format'
import { reactive, computed } from 'vue'

// - data
const switchState = reactive({
  switchStatus: false // 用于解决el-switch初始化会执行change事件
})

// - store
const commonStore = useCommonStore()
const systemStore = useSystemStore()

// - computed
// 初始化选择框异步选项数据
const modelConfigCpt = computed(() => {
  const entireRoles = commonStore.entireRoles?.map((item) => {
    return { label: item.name, value: item.id + '' }
  })
  const entireDepartments = commonStore.entireDepartments?.map((item) => {
    return { label: item.name, value: item.id + '' }
  })

  modelConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') item.options = [...entireRoles]
    if (item.prop === 'departmentId') item.options = [...entireDepartments]
  })

  return modelConfig
})

// - hooks
const { pageContentRef, handleResetClick, handleSearchClick, handleUpdatePageData } =
  usePageContent()
const { pageModelRef, handleAddNewClick, handleEditClick } = usePageModel()

// - mehods
const handleBeforeSwitchChange = () => {
  switchState.switchStatus = true
  return switchState.switchStatus
}
const handleSwitchChange = (item: any) => {
  if (switchState.switchStatus) {
    console.log(item)
  }
}
const handleDeleteClick = (payload: any) => {
  systemStore.deletePageDataAction(contentConfig.pageName, payload.id).then((res) => {
    if (res.code === 0) {
      // 更新页面数据
      pageContentRef.value?.fetchPageData()
      pageContentRef.value?.updateCommonData()

      ElMessage.success('删除用户成功')
    } else {
      ElMessage.error('删除用户失败')
    }
  })
}
</script>

<style scoped lang="less">
.user {
  border-radius: 15px;
  overflow: hidden;
}
</style>
