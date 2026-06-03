<script lang="ts" setup>
import { miniLogin } from '@/utils/login'

definePage({ style: { navigationBarTitleText: '我的' } })

const isLogin = ref(false)
const userName = ref('')

const menus = [
  { icon: 'i-carbon-favorite', title: '我的收藏', path: '/pages/collection/index' },
  { icon: 'i-carbon-time', title: '浏览历史', path: '/pages/history/index' },
  { icon: 'i-carbon-map', title: '关于我们', path: '/pages/about/about' },
]

async function doLogin() {
  try {
    uni.showLoading({ title: '登录中...' })
    const { code } = await miniLogin()
    // TODO: 将 code 发给后端换取 token，等 uniCloud 建好后对接
    console.log('登录凭证:', code)
    isLogin.value = true
    userName.value = '旅行者'
    uni.hideLoading()
    uni.showToast({ title: '登录成功', icon: 'success' })
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: '登录失败，请重试', icon: 'none' })
  }
}

function goPage(path: string) {
  if (!isLogin.value) { uni.showToast({ title: '请先登录', icon: 'none' }); return }
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="page">
    <view class="profile">
      <view class="avatar">
        <view class="i-carbon-user text-3xl text-gray-600" />
      </view>
      <view class="profile-info">
        <text v-if="isLogin" class="nickname">{{ userName }}</text>
        <text v-else class="login-btn" @click="doLogin">点击登录</text>
        <text class="hint">登录后可收藏攻略、查看浏览历史</text>
      </view>
    </view>

    <view class="menu">
      <view v-for="(item, idx) in menus" :key="idx" class="menu-item" @click="goPage(item.path)">
        <view class="menu-left">
          <view :class="item.icon" class="menu-icon" />
          <text class="menu-title">{{ item.title }}</text>
        </view>
        <view class="i-carbon-chevron-right text-gray-700" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; }
.profile { padding: 48px 24px 32px; background: #0D0D0D; display: flex; align-items: center; gap: 16px; }
.avatar { width: 64px; height: 64px; border-radius: 50%; background: #1A1A1A; display: flex; align-items: center; justify-content: center; }
.profile-info { display: flex; flex-direction: column; }
.nickname { font-size: 18px; font-weight: bold; color: #E5E5E5; }
.login-btn { font-size: 18px; color: #999; }
.hint { margin-top: 2px; font-size: 12px; color: #6B6B6B; }
.menu { margin-top: 12px; background: #0D0D0D; }
.menu-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid #1A1A1A; }
.menu-left { display: flex; align-items: center; gap: 12px; }
.menu-icon { font-size: 20px; color: #6B6B6B; }
.menu-title { font-size: 14px; color: #ccc; }
</style>
