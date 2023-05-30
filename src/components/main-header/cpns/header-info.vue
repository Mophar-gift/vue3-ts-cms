<template>
  <div class="header-info">
    <div class="operation">
      <span class="operation-item flex-c-c">
        <el-icon><Bell /></el-icon>
      </span>

      <span class="operation-item flex-c-c">
        <el-icon><ChatDotRound /></el-icon>
        <i class="dot"></i>
      </span>

      <span class="operation-item flex-c-c">
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <div class="dropdown">
      <el-dropdown>
        <div class="dropdown-info">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="info-name">{{ loginStore.userInfo?.name }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>

            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>

            <el-dropdown-item divided @click="handleLogoutClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

// store/router
const router = useRouter()
const loginStore = useLoginStore()

// methods
const handleLogoutClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  localCache.removeCache('userMenus')
  localCache.removeCache('userInfo')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;

  .operation {
    display: flex;
    align-items: center;
    margin-right: 15px;

    .operation-item {
      position: relative;
      width: 40px;
      height: 40px;
      font-size: 20px;
      cursor: pointer;
      transform: translateY(2px);

      &:hover {
        background-color: #f2f2f2;
      }

      .dot {
        position: absolute;
        top: 6px;
        right: 5px;
        z-index: 9;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 100%;
      }
    }
  }

  .dropdown {
    cursor: pointer;

    .dropdown-info {
      display: flex;
      align-items: center;

      .info-name {
        font-size: 16px;
        font-weight: 600;
        margin-left: 2px;
        transform: translateY(2px);
      }
    }

    :global(.el-dropdown-menu__item) {
      line-height: 30px !important;
      padding: 5px 25px;
    }
  }
}
</style>
