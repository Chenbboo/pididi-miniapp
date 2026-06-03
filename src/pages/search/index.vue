<script lang="ts" setup>
import { searchArticles } from '@/api/cloud/articles'
import type { Article } from '@/api/cloud/types'

defineOptions({ name: 'Search' })
definePage({ style: { navigationBarTitleText: '搜索' } })

const keyword = ref('')
const history = ref<string[]>([])
const results = ref<Article[]>([])
const searching = ref(false)

// 读取本地搜索历史
onLoad(() => {
  const stored = uni.getStorageSync('search_history')
  if (stored) history.value = JSON.parse(stored)
})

async function doSearch() {
  if (!keyword.value.trim()) return
  searching.value = true
  try {
    // 保存搜索历史
    const kw = keyword.value.trim()
    if (!history.value.includes(kw)) {
      history.value.unshift(kw)
      if (history.value.length > 10) history.value.pop()
      uni.setStorageSync('search_history', JSON.stringify(history.value))
    }
    const result = await searchArticles(kw)
    results.value = result.list
  } catch (e) {
    console.error('搜索失败:', e)
  } finally {
    searching.value = false
  }
}

function goDetail(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view class="search-bar">
      <view class="input-box">
        <view class="i-carbon-search icon" />
        <input v-model="keyword" class="input" placeholder="搜索目的地、攻略..." confirm-type="search" @confirm="doSearch" />
        <view v-if="keyword" class="i-carbon-close icon" @click="keyword = ''" />
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-if="results.length > 0" class="results">
      <view v-for="item in results" :key="item._id" class="result-item" @click="goDetail(item._id)">
        <text class="r-cat">{{ item.category }}</text>
        <text class="r-title">{{ item.title }}</text>
      </view>
    </view>

    <view v-else-if="!searching" class="history" v-if="history.length > 0">
      <view class="history-header">
        <text class="history-title">搜索历史</text>
        <text class="clear" @click="history = []">清空</text>
      </view>
      <view class="tags">
        <view v-for="(item, idx) in history" :key="idx" class="tag" @click="keyword = item; doSearch()">{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; }
.search-bar { padding: 12px 16px; background: #0D0D0D; }
.input-box { display: flex; align-items: center; border-radius: 999px; background: #1A1A1A; padding: 8px 16px; }
.icon { font-size: 18px; color: #6B6B6B; flex-shrink: 0; }
.input { flex: 1; margin-left: 8px; background: transparent; font-size: 14px; color: #E5E5E5; }
.history { padding: 16px; }
.history-header { display: flex; align-items: center; justify-content: space-between; }
.history-title { font-size: 14px; font-weight: 500; color: #ccc; }
.clear { font-size: 12px; color: #6B6B6B; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.tag { border-radius: 999px; background: #1A1A1A; padding: 6px 12px; font-size: 12px; color: #999; }
.results { padding: 0 16px; }
.result-item { border-bottom: 1px solid #1A1A1A; padding: 14px 0; }
.r-cat { font-size: 11px; color: #C9A84C; }
.r-title { display: block; margin-top: 4px; font-size: 14px; color: #E5E5E5; }
</style>
