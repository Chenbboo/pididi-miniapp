<script lang="ts" setup>
defineProps<{ show: boolean; title?: string; subtitle?: string }>()
const emit = defineEmits<{ close: [] }>()
function close() { emit('close') }
</script>

<template>
  <view v-if="show" class="mask" @click="close">
    <view class="popup" @click.stop>
      <view class="body">
        <text class="main-text">{{ title || '看了这么久' }}</text>
        <text class="sub-text">{{ subtitle || "不如让我直接帮你规划？加微信，一对一聊聊你的越南之行～" }}</text>
      </view>
      <view class="qr-box">
        <view class="qr">
          <view class="i-carbon-qr-code text-4xl text-gray-500" />
        </view>
      </view>
      <view class="close-btn" @click="close">
        <text class="close-text">关闭</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.mask {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.7);
}
.popup {
  margin: 0 40px;
  border-radius: 16px;
  background: #1A1A1A;
  padding: 24px;
}
.body { text-align: center; }
.main-text { font-size: 18px; font-weight: bold; color: #E5E5E5; }
.sub-text { display: block; margin-top: 8px; font-size: 14px; color: #999; }
.qr-box { display: flex; justify-content: center; margin: 16px 0; }
.qr {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 12px;
  background: #222;
}
.close-btn { display: flex; justify-content: center; }
.close-text { font-size: 14px; color: #6B6B6B; }
</style>
