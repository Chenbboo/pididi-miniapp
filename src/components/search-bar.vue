<script lang="ts" setup>
const emit = defineEmits<{ search: [] }>()
function go() { emit('search') }
</script>

<template>
  <view class="bar" @click="go">
    <view class="input">
      <view class="i-carbon-search icon" />
      <text class="placeholder">搜索目的地、攻略...</text>
    </view>
  </view>
</template>

<style scoped>
.bar { padding: 0 16px; }
.input {
  display: flex;
  align-items: center;
  margin-top: 8px;
  border-radius: 999px;
  background: #1A1A1A;
  padding: 8px 16px;
}
.icon { font-size: 18px; color: #6B6B6B; }
.placeholder { margin-left: 8px; font-size: 14px; color: #6B6B6B; }
</style>
