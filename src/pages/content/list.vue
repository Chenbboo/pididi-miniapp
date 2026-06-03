<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'

defineOptions({ name: 'ContentList' })
definePage({ style: { navigationBarTitleText: '攻略' } })

const activeTab = ref(0)
const sortType = ref<'latest' | 'hot'>('latest')
const tabs = ['全部', '目的地攻略', '主题玩法', '行程规划', '出行攻略', '避坑指南', '本地文化']

const list = ref([
  { id: 1, title: '胡志明市顶级酒店盘点 | 住在传奇里', category: '目的地攻略', views: 1280, collects: 56 },
  { id: 2, title: '西贡 rooftop 酒吧指南 | 法式风情夜', category: '主题玩法', views: 956, collects: 42 },
  { id: 3, title: '胡志明市 3 天深度游 | 东方巴黎', category: '行程规划', views: 2103, collects: 89 },
  { id: 4, title: '越南电子签全流程 | VIP加急通道', category: '出行攻略', views: 867, collects: 31 },
  { id: 5, title: '胡志明市避坑指南 | 这些东西别碰', category: '避坑指南', views: 3421, collects: 156 },
  { id: 6, title: '西贡咖啡文化 | 从街头到精品', category: '本地文化', views: 654, collects: 28 },
])

function goDetail(id: number) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <scroll-view scroll-x class="tabs">
      <view class="tab-list">
        <view v-for="(tab, idx) in tabs" :key="idx" class="tab-item" :class="{ active: activeTab === idx }" @click="activeTab = idx">
          {{ tab }}
        </view>
      </view>
    </scroll-view>

    <view class="sort">
      <text class="sort-item" :class="{ active: sortType === 'latest' }" @click="sortType = 'latest'">最新</text>
      <text class="sort-item" :class="{ active: sortType === 'hot' }" @click="sortType = 'hot'">最热</text>
    </view>

    <view class="list">
      <ContentCard v-for="item in list" :key="item.id"
        :id="item.id" :title="item.title" :category="item.category"
        :views="item.views" :collects="item.collects"
        @click="goDetail(item.id)" />
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding-bottom: 16px; }
.tabs { border-bottom: 1px solid #222; background: #0D0D0D; }
.tab-list { display: flex; white-space: nowrap; padding: 12px 16px; }
.tab-item { margin-right: 20px; padding-bottom: 4px; font-size: 14px; color: #999; }
.tab-item.active { color: #C9A84C; font-weight: 500; }
.sort { display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: #0D0D0D; }
.sort-item { font-size: 14px; color: #6B6B6B; }
.sort-item.active { color: #C9A84C; font-weight: 500; }
.list { display: flex; flex-direction: column; gap: 12px; padding: 0 16px; }
</style>
