<template>
  <div class="role">
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
      ref="pageModelRef"
      :model-config="modelConfig"
      :model-other-data="modelOtherData"
      @update-page-data="handleUpdatePageData"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          style="width: 100%"
          node-key="id"
          :data="commonStore.entireMenus"
          :props="{ label: 'name', children: 'children' }"
          show-checkbox
          @check="handleTreeCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import useSystemStore from '@/stores/main/system/system'
import useCommonStore from '@/stores/main/common/common'

import { ElMessage, ElTree } from 'element-plus'
import { formatUTC } from '@/utils/format'
import { mapMenuListToIds } from '@/utils/permission'
import { ref, reactive, nextTick } from 'vue'

// - hooks
const { pageContentRef, handleResetClick, handleSearchClick, handleUpdatePageData } =
  usePageContent()
const { pageModelRef, handleAddNewClick, handleEditClick } = usePageModel(editCallBack)

// - store
const systemStore = useSystemStore()
const commonStore = useCommonStore()

// - data
const treeRef = ref<InstanceType<typeof ElTree>>()
const modelOtherData = reactive({})

// - computed
function editCallBack(payload) {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(mapMenuListToIds(payload.menuList))
  })
}

// - methods
const handleDeleteClick = (payload) => {
  systemStore.deletePageDataAction(contentConfig.pageName, payload.id).then((res) => {
    if (res.code === 0) {
      // 更新页面数据
      pageContentRef.value?.fetchPageData()
      pageContentRef.value?.updateCommonData()

      ElMessage.success('删除角色成功')
    } else {
      ElMessage.error('删除角色失败')
    }
  })
}
const handleTreeCheck = (checkedN, checkedK) => {
  modelOtherData['menuList'] = [...checkedK.checkedKeys, ...checkedK.halfCheckedKeys]
}
</script>

<style scoped>
.role {
}
</style>
