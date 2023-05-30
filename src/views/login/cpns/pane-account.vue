<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="right"
      label-width="70px"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入帐号" size="large" clearable />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="formData.password"
          placeholder="请输入密码"
          type="password"
          show-password
          size="large"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import type { FormInstance, FormRules } from 'element-plus'
import type { IAccount } from '@/types'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'

// - store/router
const loginStore = useLoginStore()

// - data
const formRef = ref<FormInstance>()
const formData = reactive<IAccount>({
  name: localCache.getCache('account')?.name ?? '',
  password: localCache.getCache('account')?.password ?? ''
})
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '必须输入帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}/i, message: '必须为6~10位数字或字母组成', trigger: 'blur' }
  ],
  password: [{ required: true, message: '必须输入密码', trigger: 'blur' }]
})

// - methods
const loginAction = (isRememberPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 发起登录接口
      const account: IAccount = { name: formData.name, password: formData.password }
      loginStore.loginAction(account)

      // 记住账号密码
      if (isRememberPwd) {
        localCache.setCache('account', account)
        localCache.setCache('isRememberPwd', true)
      } else {
        localCache.removeCache('account')
        localCache.removeCache('isRememberPwd')
      }
    } else {
      ElMessage.warning('请检查帐号密码!')
    }
  })
}

defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.pane-account {
  padding: 15px 10px 0 0;

  :deep(.el-form-item) {
    --el-component-size-large: 38px;

    .el-form-item__label {
      line-height: 38px;
    }
  }
}
</style>
