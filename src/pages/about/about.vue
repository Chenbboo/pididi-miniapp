<script lang="ts" setup>
definePage({ style: { navigationBarTitleText: '关于我们' } })
</script>

<template>
  <view class="page">
    <view class="logo">
      <view class="i-carbon-map text-5xl text-gray-600" />
    </view>
    <text class="brand">PiDiDi 骑士俱乐部</text>
    <text class="desc">
      专注越南高端定制旅行。不是跟团游，不是穷游攻略。
      我们为追求品质的你，提供一对一的专属旅行定制服务。
    </text>
    <view class="contact">
      <text class="contact-title">联系方式</text>
      <text class="contact-item">企业微信：PiDiDiVIP</text>
      <text class="contact-item">邮箱：contact@pididi.com</text>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; display: flex; flex-direction: column; align-items: center; padding: 0 24px 32px; }
.logo { width: 96px; height: 96px; border-radius: 16px; background: #1A1A1A; display: flex; align-items: center; justify-content: center; margin-top: 40px; }
.brand { margin-top: 16px; font-size: 20px; font-weight: bold; color: #E5E5E5; }
.desc { margin-top: 8px; text-align: center; font-size: 14px; line-height: 1.6; color: #999; }
.contact { width: 100%; border-radius: 12px; background: #1A1A1A; padding: 16px; margin-top: 24px; }
.contact-title { font-size: 12px; color: #6B6B6B; }
.contact-item { display: block; margin-top: 8px; font-size: 14px; color: #ccc; }
</style>
