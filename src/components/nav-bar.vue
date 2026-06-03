<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  showBack?: boolean
  showLogo?: boolean
}>(), {
  title: '',
  showBack: false,
  showLogo: false,
})

const statusBarHeight = ref(0)
const navBarHeight = 44

onMounted(() => {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 20
})

function goBack() { uni.navigateBack() }
</script>

<template>
  <view>
    <view :style="{ height: `${statusBarHeight + navBarHeight}px` }" />
    <view class="navbar" :style="{ height: `${statusBarHeight + navBarHeight}px`, paddingTop: `${statusBarHeight}px` }">
      <view class="inner">
        <view v-if="showBack" class="back-btn" @click="goBack">
          <view class="i-carbon-arrow-left text-lg text-white" />
        </view>

        <view class="brand">
          <image v-if="showLogo" src="/static/logo.jpg" class="logo" mode="aspectFill" />
          <text class="title">{{ title || 'PiDiDi骑士俱乐部' }}</text>
        </view>

        <view class="spacer" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #0D0D0D;
}
.inner {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
}
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  margin-right: 10px;
  flex-shrink: 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  overflow: hidden;
}
.logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
}
.title {
  font-size: 16px;
  font-weight: 600;
  color: #C9A84C;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spacer { flex: 1; }
</style>
