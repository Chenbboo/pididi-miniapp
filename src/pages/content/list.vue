<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'
import { getArticleList } from '@/api/cloud/articles'
import type { Article } from '@/api/cloud/types'

defineOptions({ name: 'ContentList' })
definePage({ style: { navigationBarTitleText: '攻略' } })

const activeTab = ref(0)
const sortType = ref<'latest' | 'hot'>('latest')
const tabs = ['全部', '目的地攻略', '主题玩法', '行程规划', '出行攻略', '避坑指南', '本地文化']

const list = ref<Article[]>([])
const loading = ref(true)
const hasMore = ref(true)
let page = 1

async function fetchList(reset = false) {
  if (reset) { page = 1; list.value = [] }
  try {
    loading.value = true
    const category = activeTab.value === 0 ? undefined : tabs[activeTab.value]
    const result = await getArticleList({ page, pageSize: 10, category, sort: sortType.value })
    if (reset) {
      list.value = result.list
    } else {
      list.value.push(...result.list)
    }
    hasMore.value = result.hasMore
  } catch (e) {
    console.error('获取攻略列表失败:', e)
  } finally {
    loading.value = false
  }
}

function onTabChange(idx: number) {
  activeTab.value = idx
  fetchList(true)
}

function onSortChange(type: 'latest' | 'hot') {
  sortType.value = type
  fetchList(true)
}

function onLoadMore() {
  if (!hasMore.value || loading.value) return
  page++
  fetchList()
}

onLoad(() => { fetchList(true) })

function goDetail(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <scroll-view scroll-x class="tabs">
      <view class="tab-list">
        <view v-for="(tab, idx) in tabs" :key="idx" class="tab-item" :class="{ active: activeTab === idx }" @click="onTabChange(idx)">
          {{ tab }}
        </view>
      </view>
    </scroll-view>

    <view class="sort">
      <text class="sort-item" :class="{ active: sortType === 'latest' }" @click="onSortChange('latest')">最新</text>
      <text class="sort-item" :class="{ active: sortType === 'hot' }" @click="onSortChange('hot')">最热</text>
    </view>

    <view class="list">
      <ContentCard v-for="item in list" :key="item._id"
        :id="item._id" :title="item.title" :category="item.category"
        :views="item.views" :cover="item.cover" :collects="item.collects"
        @click="goDetail(item._id)" />
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
