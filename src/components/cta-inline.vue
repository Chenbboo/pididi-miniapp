<script lang="ts" setup>
withDefaults(defineProps<{
  text?: string
  action?: string
}>(), {
  text: '不想自己跑签证？VIP加急通道，交给我们来处理',
  action: '扫码加微信，立即办理 →',
})
</script>

<template>
  <view class="card">
    <text class="main-text">{{ text }}</text>
    <view class="row">
      <text class="action">{{ action }}</text>
      <view class="qr">
        <view class="i-carbon-qr-code text-lg text-gray-500" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.card {
  margin: 16px 0;
  border-radius: 12px;
  padding: 16px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.15);
}
.main-text { font-size: 14px; font-weight: 500; color: #C9A84C; }
.row { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
.action { font-size: 12px; color: #C9A84C; }
.qr {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #222;
}
</style>
