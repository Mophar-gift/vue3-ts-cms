<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <main-menu :isCollapse="isCollapse" />
      </el-aside>

      <el-container>
        <el-header>
          <main-header @change-aside-width="handleChangeAsideWidth" />
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

// - data
const isCollapse = ref(false)

// - methods
const handleChangeAsideWidth = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-container {
    height: 100%;

    .el-header {
      padding: 0;
    }
    .el-main {
      background-color: #f7fafd;
    }
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      background-color: #001429;
      scrollbar-width: none;
      -ms-overflow-style: none;
      transition: width 0.4s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
