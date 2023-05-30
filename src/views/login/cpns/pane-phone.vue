<template>
  <div class="pane-phone">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="right"
      label-width="70px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model.trim="formData.phone"
          placeholder="请输入手机号"
          size="large"
          maxlength="11"
          clearable
        />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <div class="code-wrap">
          <el-input
            v-model.trim="formData.code"
            placeholder="请输入验证码"
            size="large"
            clearable
          />
          <el-button
            class="code-btn"
            type="primary"
            size="large"
            :disabled="isCodeDisabled"
            @click.stop="handleSendCodeClick"
            >{{ codeTextCpt }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, computed } from 'vue'

// - data
const isCodeDisabled = ref<boolean>(false)
const codeTimeCount = ref<number>(60)
const codeTimer = ref()
const formRef = ref<FormInstance>()
const formData = reactive({
  phone: '',
  code: ''
})
const formRules = reactive<FormRules>({
  phone: [
    { required: true, message: '必须输入手机号', trigger: 'blur' },
    { pattern: /^[0-9]{11}$/, message: '请检查手机号', trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// - watch/computed
const codeTextCpt = computed(() => {
  if (isCodeDisabled.value) {
    return `重新发送 ${codeTimeCount.value}`
  } else {
    return '发送验证码'
  }
})

// - methods
const loginAction = async () => {
  await formRef.value?.validate((valid) => {
    if (valid) {
      console.log('手机号登录', formData)
    } else {
      console.log('error submit!')
    }
  })
}
const handleSendCodeClick = () => {
  if (codeTimer.value) clearInterval(codeTimer.value)
  isCodeDisabled.value = true

  codeTimer.value = setInterval(() => {
    codeTimeCount.value--

    if (codeTimeCount.value === 0) {
      clearInterval(codeTimer.value)
      codeTimeCount.value = 60
      isCodeDisabled.value = false
    }
  }, 1000)
}

defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.pane-phone {
  padding: 15px 10px 0 0;

  :deep(.el-form-item) {
    --el-component-size-large: 38px;

    .el-form-item__label {
      line-height: 38px;
    }
  }

  .code-wrap {
    display: flex;

    .code-btn {
      max-width: 40%;
      margin-left: 8px;

      --el-button-size: 38px;
    }
  }
}
</style>
