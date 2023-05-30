<template>
  <div class="main-header flex-b-c">
    <div class="left">
      <el-icon class="left-icon" @click="handleFoldClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>

      <div class="breadcrumb"><header-breadcrumb /></div>
    </div>

    <div class="right"><header-info /></div>
  </div>
</template>

<script setup lang="ts">
import HeaderBreadcrumb from './cpns/header-breadcrumb.vue'
import HeaderInfo from './cpns/header-info.vue'
import { ref } from 'vue'

// - data
const isFold = ref(false)

// - emits
const emit = defineEmits(['changeAsideWidth'])

// - methods
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('changeAsideWidth', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  background-color: #ffffff;
  height: 100%;
  padding: 0 30px 0 20px;
  user-select: none;

  .left {
    display: flex;
    align-items: center;

    .left-icon {
      font-size: 28px;
      cursor: pointer;
    }
    .breadcrumb {
      margin-left: 20px;
    }
  }

  .right {
  }
}
</style>
