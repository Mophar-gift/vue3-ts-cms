<template>
  <div class="main-menu">
    <div class="menu-logo">
      <img class="logo-img" src="@/assets/img/logo.svg" />
      <span v-show="!isCollapse" class="logo-text">KG-CMS</span>
    </div>

    <div class="menu-content">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
        router
      >
        <template v-for="item in loginStore.userMenus" :key="item.id">
          <!-- 二级 -->
          <el-sub-menu :index="item.url" v-if="item.children?.length > 0">
            <template #title>
              <el-icon><component :is="item.icon?.split('-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.url">{{ subItem.name }}</el-menu-item>
            </template>
          </el-sub-menu>

          <!-- 一级 -->
          <el-menu-item :index="item.url" v-else>
            <template #title>
              <el-icon><component :is="item.icon?.split('-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// - props
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// - store/router
const loginStore = useLoginStore()
const route = useRoute()

// - computed
const defaultActive = computed(() => route.path)
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;

  .menu-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    overflow: hidden;
    padding: 15px 10px 10px 5px;
    border-bottom: 1px solid #002d52;

    .logo-img {
      height: 100%;
      margin: 0 10px;
    }

    .logo-text {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }

  .menu-content {
    user-select: none;

    .el-menu {
      border: none;

      .el-menu-item {
        background-color: #09233b;
        padding-left: 50px;
      }
      .el-menu-item:hover {
        color: #fff;
        background-color: #1a7dff37;
      }
      .el-menu-item.is-active {
        background-color: #1d61ba;
      }
    }
  }
}
</style>
