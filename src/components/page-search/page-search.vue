<template>
  <div class="page-search" v-if="isSearch">
    <el-form
      ref="formRef"
      :model="formData"
      :label-position="searchConfig.labelPosition ?? 'right'"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="10">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  style="width: 100%"
                  v-model="formData[item.prop]"
                  type="daterange"
                  :range-separator="item['range-separator'] ?? '-'"
                  :start-placeholder="item['start-placeholder'] ?? '开始时间'"
                  :end-placeholder="item['end-placeholder'] ?? '结束时间'"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="search-actions">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>

      <el-button icon="Search" size="large" type="primary" @click="handleSearchClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ISearchConfig } from './type'
import useBtnPermissions from '@/hooks/useBtnPermissions'
import { ref, reactive } from 'vue'

// - props
const props = defineProps<{
  searchConfig: ISearchConfig
}>()

// - emit
const emit = defineEmits(['searchClick', 'resetClick'])

// - data
const isSearch = useBtnPermissions(`${props.searchConfig.pageName}:query`)
const formRef = ref<FormInstance>()
const formData = reactive({})

// - methods
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}
const handleSearchClick = () => {
  emit('searchClick', { ...formData })
}

// - init fn
const init = () => {
  // 初始化formData
  for (const item of props.searchConfig.formItems) {
    formData[item.prop] = item.initialValue ?? ''
  }
}
init()

// - expose
defineExpose({ handleSearchClick, handleResetClick, formData })
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    margin: 0;
    padding: 15px 45px;

    .el-input {
      max-width: 500px;
    }
  }

  .search-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 70px;
  }
}
</style>
