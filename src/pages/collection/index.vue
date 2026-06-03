<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'

defineOptions({ name: 'Collection' })
definePage({ style: { navigationBarTitleText: '我的收藏' } })

const list = ref([
  { id: 2, title: '越南米其林餐厅盘点', category: '主题玩法', views: 956 },
  { id: 5, title: '河内骗局全揭秘', category: '避坑指南', views: 3421 },
])

function goDetail(id: number) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view v-if="list.length === 0" class="empty">
      <view class="i-carbon-favorite text-5xl text-gray-700" />
      <text class="empty-text">还没有收藏攻略</text>
    </view>

    <view class="list" v-else>
      <ContentCard v-for="item in list" :key="item.id"
        :id="item.id" :title="item.title" :category="item.category" :views="item.views"
        @click="goDetail(item.id)" />
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding: 16px; }
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 0; }
.empty-text { margin-top: 12px; font-size: 14px; color: #6B6B6B; }
.list { display: flex; flex-direction: column; gap: 12px; }
</style>
