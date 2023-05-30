<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-icon="CaretRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

      <template v-for="item in breadcrumbs" :key="item.id">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumb } from '@/utils/permission'
import { computed } from 'vue'

// - store/router
const loginStore = useLoginStore()
const route = useRoute()

// - computed
const breadcrumbs = computed(() => mapPathToBreadcrumb(route.path, loginStore.userMenus))
</script>

<style lang="less" scoped>
.header-breadcrumb {
}
</style>
