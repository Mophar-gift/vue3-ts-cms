<template>
  <div class="user-model">
    <el-dialog
      v-model="isShowModel"
      :title="isEditModel ? modelConfig.title.editTitle : modelConfig.title.addNewTitle"
      width="30%"
      center
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="model-form">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="modelConfig.rules"
          :label-width="modelConfig.labelWidth ?? '100'"
          :label-position="modelConfig.labelPosition ?? 'right'"
          :size="modelConfig.size ?? 'large'"
        >
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <!-- input -->
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model.trim="formData[item.prop]" :placeholder="item.placeholder" />
              </el-form-item>
            </template>

            <!-- input (password) -->
            <template v-if="item.type === 'password' && !isEditModel">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input
                  type="password"
                  v-model.trim="formData[item.prop]"
                  :placeholder="item.placeholder"
                  show-password
                />
              </el-form-item>
            </template>

            <!-- select -->
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  style="width: 100%"
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value + ''" />
                  </template>
                </el-select>
              </el-form-item>
            </template>

            <!-- costom -->
            <template v-if="item.type === 'custom'">
              <el-form-item :label="item.label" :prop="item.prop">
                <slot :name="item.slotName"></slot>
              </el-form-item>
            </template>
          </template>
        </el-form>
      </div>

      <template #footer>
        <div class="model-footer">
          <el-button @click="hiddenModel">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useSystemStore from '@/stores/main/system/system'
import { ElMessage, type FormInstance } from 'element-plus'
import { ref, reactive } from 'vue'
import type { IModelConfig } from './type'

// - props
const props = defineProps<{
  modelConfig: IModelConfig
  modelOtherData?: object
}>()

// - store
const systemStore = useSystemStore()

// - data
const formRef = ref<FormInstance>()
const isShowModel = ref(false)
const isEditModel = ref(false)
const editItem = ref()
const formData = reactive({})

// - emit
const emit = defineEmits(['updatePageData'])

// - methods
const handleConfirmClick = () => {
  // 合并其他表单数据
  let submitData = formData
  if (props.modelOtherData) submitData = { ...formData, ...props.modelOtherData }

  formRef.value?.validate((valid) => {
    if (valid) {
      if (isEditModel.value) {
        systemStore
          .editPageDataAction(props.modelConfig.pageName, editItem.value.id, { ...submitData })
          .then((res) => {
            if (res.code === 0) {
              hiddenModel()
              emit('updatePageData')
              ElMessage.success('修改成功')
            } else {
              ElMessage.error('创建失败')
            }
          })
      } else {
        systemStore
          .addNewPageDataAction(props.modelConfig.pageName, { ...submitData })
          .then((res) => {
            if (res.code === 0) {
              hiddenModel()
              emit('updatePageData')
              ElMessage.success('创建成功')
            } else {
              ElMessage.error('创建失败')
            }
          })
      }
    }
  })
}
const showModel = (isEdit = false, payload?: any) => {
  isEditModel.value = isEdit

  if (isEdit && payload) {
    // 编辑
    for (const key in formData) {
      if (typeof payload[key] === 'object') {
        formData[key] = payload[key]
      } else {
        formData[key] = payload[key] + ''
      }
    }

    editItem.value = { ...payload }
  } else {
    // 新增
    for (const key in formData) {
      const findItem = props.modelConfig.formItems.find((item) => item.prop === key)
      formData[key] = findItem?.initialValue ? findItem.initialValue : ''
    }
    editItem.value = null
  }
  isShowModel.value = true
}
const hiddenModel = () => {
  formRef.value?.resetFields()
  isShowModel.value = false
}

// - init fn
const init = () => {
  // 初始化formData
  for (const item of props.modelConfig.formItems) {
    formData[item.prop] = ''
  }
}
init()

// - expose
defineExpose({ showModel })
</script>

<style lang="less" scoped>
.user-model {
  .model-form {
    padding: 0 30px 0 20px;

    .el-form-item {
      margin: 0;
      padding: 15px 0;

      .el-input {
        max-width: 500px;
      }
    }
  }

  .model-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 35px;

    .el-button {
      padding: 0 20px;
    }
  }
}
</style>
