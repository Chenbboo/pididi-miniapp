<script lang="ts" setup>
defineOptions({ name: 'Search' })
definePage({ style: { navigationBarTitleText: '搜索' } })

const keyword = ref('')
const history = ref<string[]>(['岘港酒店', '越南签证', '下龙湾', '富国岛度假村'])

function doSearch() { if (!keyword.value.trim()) return }
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

    <view class="history" v-if="history.length > 0">
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
</style>
