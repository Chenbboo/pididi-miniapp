<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  subtitle?: string
}>(), {
  title: '去越南？加我微信',
  subtitle: '帮你定制专属高端行程',
})
</script>

<template>
  <view>
    <view class="bar">
      <view>
        <text class="main-text">{{ title }}</text>
        <text class="sub-text">{{ subtitle }}</text>
      </view>
      <view class="right">
        <view class="qr">
          <view class="i-carbon-qr-code text-lg text-gray-500" />
        </view>
        <view class="i-carbon-chevron-right text-gray-600" />
      </view>
    </view>
    <view class="spacer" />
  </view>
</template>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid #333;
  background: rgba(13,13,13,0.95);
}
.main-text { font-size: 14px; font-weight: 500; color: #E5E5E5; display: block; }
.sub-text { font-size: 12px; color: #6B6B6B; display: block; }
.right { display: flex; align-items: center; gap: 12px; }
.qr {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #222;
}
.spacer { height: 80px; }
</style>
