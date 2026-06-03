<script lang="ts" setup>
defineOptions({ name: 'History' })
definePage({ style: { navigationBarTitleText: '浏览历史' } })

const list = ref([
  { id: 1, title: '岘港洲际酒店全攻略', category: '目的地攻略', time: '今天 14:32' },
  { id: 3, title: '5天高端定制行程', category: '行程规划', time: '昨天 09:15' },
  { id: 5, title: '河内骗局全揭秘', category: '避坑指南', time: '6月1日' },
])

function goDetail(id: number) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view v-if="list.length === 0" class="empty">
      <view class="i-carbon-time text-5xl text-gray-700" />
      <text class="empty-text">暂无浏览记录</text>
    </view>

    <view class="list" v-else>
      <view v-for="item in list" :key="item.id" class="item" @click="goDetail(item.id)">
        <view class="item-left">
          <text class="cat">{{ item.category }}</text>
          <text class="title">{{ item.title }}</text>
        </view>
        <text class="time">{{ item.time }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding: 16px; }
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 0; }
.empty-text { margin-top: 12px; font-size: 14px; color: #6B6B6B; }
.list { display: flex; flex-direction: column; gap: 12px; }
.item { display: flex; align-items: flex-start; justify-content: space-between; border-radius: 12px; background: #1A1A1A; padding: 16px; }
.item-left { flex: 1; }
.cat { font-size: 12px; color: #C9A84C; }
.title { display: block; margin-top: 4px; font-size: 14px; font-weight: 500; color: #E5E5E5; }
.time { font-size: 12px; color: #555; flex-shrink: 0; margin-left: 12px; }
</style>
