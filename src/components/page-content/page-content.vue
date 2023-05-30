<template>
  <div class="page-content">
    <div class="header">
      <div class="header-title">{{ contentConfig.header?.title ?? '数据列表' }}</div>

      <div class="header-actions">
        <el-button v-if="isCreate" type="primary" @click="handleAddNewClick">
          {{ contentConfig.header?.btnTitle ?? '新增' }}
        </el-button>

        <el-button
          v-if="contentConfig.hasTableSelection && isDel"
          type="danger"
          :disabled="tableSelection.length === 0"
          @click="handleMultiDeleteClick"
          >批量删除</el-button
        >
      </div>
    </div>

    <div class="table">
      <el-table
        :data="systemStore.pageDataList"
        style="width: 100%"
        border
        v-bind="contentConfig.childrenTree"
        @selection-change="handleTableSelectionChange"
      >
        <!-- 多选 -->
        <el-table-column
          v-if="contentConfig.hasTableSelection"
          type="selection"
          width="55"
          align="center"
        />
        <!-- 序号 -->
        <el-table-column
          v-if="contentConfig.hasTableIndex"
          type="index"
          width="55"
          label="序号"
          align="center"
        />

        <template v-for="item in contentConfig.tableItems" :key="item.prop">
          <el-table-column v-bind="item" :align="item.align ?? 'center'" show-overflow-tooltip>
            <template v-if="item.slotName" #default="scope">
              <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-if="contentConfig.hasPagination ?? true"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="Number(systemStore.pageDataTotalCount)"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useBtnPermissions from '@/hooks/useBtnPermissions'
import useCommonStore from '@/stores/main/common/common'
import useSystemStore from '@/stores/main/system/system'
import { reactive, ref } from 'vue'
import type { IContentConfig } from './type'

// - props
const props = defineProps<{
  contentConfig: IContentConfig
}>()

// - store
const systemStore = useSystemStore()
const commonStore = useCommonStore()

// - data
const isCreate = useBtnPermissions(`${props.contentConfig.pageName}:create`)
const isDel = useBtnPermissions(`${props.contentConfig.pageName}:delete`)
const isSearch = useBtnPermissions(`${props.contentConfig.pageName}:query`)

const tableSelection = ref<any[]>([])
const pagination = reactive({
  currentPage: 1,
  pageSize: 10
})

// - emit
const emit = defineEmits(['addNewClick', 'editClick', 'pagSizeChange', 'pageChange'])

// - methods
const handleTableSelectionChange = (val) => {
  tableSelection.value = val
}
const handleSizeChange = () => {
  emit('pagSizeChange')
}
const handleCurrentChange = () => {
  emit('pageChange')
}
const handleAddNewClick = () => {
  emit('addNewClick')
}
const handleMultiDeleteClick = () => {
  console.log(tableSelection.value)
}

// - reusable
const fetchPageData = (searchVal: any = -1) => {
  if (!isSearch) return
  if (searchVal !== -1) pagination.currentPage = 1 // 重置当前页

  const size = pagination.pageSize
  const offset = (pagination.currentPage - 1) * size
  systemStore.fetchPageDataAction(props.contentConfig.pageName, { size, offset, ...searchVal })
}
const fetchPageDataByPag = (searchVal = {}) => {
  if (!isSearch) return
  const size = pagination.pageSize
  const offset = (pagination.currentPage - 1) * size
  systemStore.fetchPageDataAction(props.contentConfig.pageName, { size, offset, ...searchVal })
}
const updateCommonData = () => {
  commonStore.fetchEntireDepartmentAction()
  commonStore.fetchEntireRolesAction()
}

// - init fn
const init = () => {
  fetchPageData()
}
init()

// - expose
defineExpose({ fetchPageData, updateCommonData, fetchPageDataByPag })
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;

    .header-title {
      font-size: 22px;
      font-weight: 800;
    }
  }

  .table {
    margin-top: 20px;

    :deep(.el-table) {
      .el-table__cell {
        padding: 10px 0;
      }
    }

    .action-btn {
      margin-left: 2px;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 50px 0 30px 0;
  }
}
</style>
