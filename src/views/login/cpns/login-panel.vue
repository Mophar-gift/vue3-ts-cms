<template>
  <div class="login-panel">
    <div class="panel-title">KG - CMS</div>

    <div class="panel-tabs">
      <el-tabs type="border-card" stretch v-model="tabActiveName">
        <el-tab-pane name="account">
          <template #label>
            <div class="tab-label flex-c-c">
              <el-icon :size="20"><User /></el-icon>
              <span class="tab-label-text">帐号登录</span>
            </div>
          </template>

          <pane-account ref="paneAccountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <div class="tab-label flex-c-c">
              <el-icon :size="20"><Cellphone /></el-icon>
              <span class="tab-label-text">手机登录</span>
            </div>
          </template>

          <pane-phone ref="panePhoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="panel-control flex-b-c" v-show="tabActiveName === 'account'">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="panel-btn" type="primary" size="large" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

// - data
const paneAccountRef = ref<InstanceType<typeof PaneAccount>>()
const panePhoneRef = ref<InstanceType<typeof PaneAccount>>()
const isRememberPwd = ref<boolean>(localCache.getCache('isRememberPwd' ?? false))
const tabActiveName = ref('account')

// - watch
watch(isRememberPwd, (newVal) => {
  localCache.setCache('isRememberPwd', newVal)
})

// - methods
const handleLoginClick = () => {
  if (tabActiveName.value === 'account') {
    paneAccountRef.value?.loginAction(isRememberPwd.value)
  } else {
    panePhoneRef.value?.loginAction(isRememberPwd.value)
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 350px;
  margin-bottom: 150px;

  .panel-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .panel-tabs {
    margin-top: 15px;

    .tab-label {
      .tab-label-text {
        margin-left: 3px;
      }
    }
  }

  .panel-control {
    margin-top: 5px;
  }

  .panel-btn {
    margin-top: 5px;
    width: 100%;
  }
}
</style>
