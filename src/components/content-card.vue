<script lang="ts" setup>
defineProps<{
  id: number
  title: string
  category: string
  views?: number
  collects?: number
  image?: string
  time?: string
}>()

const emit = defineEmits<{ click: [] }>()
function go() { emit('click') }
</script>

<template>
  <view class="card-box" @click="go">
    <view class="card-img">
      <image v-if="image" :src="image" class="img" mode="aspectFill" />
      <view v-else class="img-placeholder">
        <view class="i-carbon-image text-4xl text-gray-600" />
      </view>
    </view>
    <view class="card-body">
      <text class="cat-tag">{{ category }}</text>
      <text class="title">{{ title }}</text>
      <view class="meta">
        <view v-if="views !== undefined" class="meta-item">
          <view class="i-carbon-view meta-icon" />{{ views }}
        </view>
        <view v-if="collects !== undefined" class="meta-item">
          <view class="i-carbon-favorite meta-icon" />{{ collects }}
        </view>
        <text v-if="time" class="time">{{ time }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.card-box {
  overflow: hidden;
  border-radius: 12px;
  background-color: #1A1A1A;
}
.card-img {
  display: flex;
  height: 160px;
  align-items: center;
  justify-content: center;
  background-color: #222;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-body {
  padding: 12px;
}
.cat-tag {
  font-size: 12px;
  color: #C9A84C;
}
.title {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #E5E5E5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6B6B6B;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 12px;
}
.meta-icon {
  font-size: 12px;
}
.time {
  color: #555;
}
</style>
