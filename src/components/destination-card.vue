<script lang="ts" setup>
defineProps<{
  id: string
  name: string
  nameEn: string
  region: string
  count: number
  image?: string
}>()

const emit = defineEmits<{ click: [] }>()
function go() { emit('click') }
</script>

<template>
  <view class="card" @click="go">
    <view class="cover">
      <image v-if="image" :src="image" class="img" mode="aspectFill" />
      <view v-else class="placeholder">
        <view class="i-carbon-map text-4xl text-gray-600" />
      </view>
      <view class="overlay">
        <text class="name">{{ name }}</text>
        <text class="name-en">{{ nameEn }}</text>
      </view>
      <view class="badge">{{ region }} · {{ count }}篇攻略</view>
    </view>
  </view>
</template>

<style scoped>
.card {
  overflow: hidden;
  border-radius: 12px;
  background-color: #1A1A1A;
}
.cover {
  position: relative;
  height: 144px;
  background-color: #222;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 12px;
}
.name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
.name-en {
  margin-left: 8px;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
}
.badge {
  position: absolute;
  right: 12px;
  top: 12px;
  border-radius: 999px;
  background: rgba(0,0,0,0.6);
  padding: 2px 8px;
  font-size: 12px;
  color: #ccc;
}
</style>
