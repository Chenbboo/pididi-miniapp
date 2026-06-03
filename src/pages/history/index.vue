<script lang="ts" setup>
import { getHistoryList } from '@/api/cloud/history'

defineOptions({ name: 'History' })
definePage({ style: { navigationBarTitleText: '浏览历史' } })

const list = ref<any[]>([])
const loading = ref(true)

async function fetchHistory() {
  try {
    const data = await getHistoryList()
    list.value = data.filter(item => item.article).map(item => ({
      _id: item.article!._id,
      title: item.article!.title,
      category: item.article!.category,
      time: formatTime(item.browse_time),
    }))
  } catch (e) {
    console.error('获取浏览历史失败:', e)
  } finally {
    loading.value = false
  }
}

function formatTime(ts: number): string {
  const now = Date.now()
  const diff = now - ts
  if (diff < 3600000) return '刚刚'
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  const d = new Date(ts)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

onShow(() => { fetchHistory() })

function goDetail(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view v-if="list.length === 0" class="empty">
      <view class="i-carbon-time text-5xl text-gray-700" />
      <text class="empty-text">暂无浏览记录</text>
    </view>

    <view class="list" v-else>
      <view v-for="item in list" :key="item._id" class="item" @click="goDetail(item._id)">
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
