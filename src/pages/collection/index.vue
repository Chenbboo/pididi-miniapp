<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'
import { getCollectionList } from '@/api/cloud/collections'

defineOptions({ name: 'Collection' })
definePage({ style: { navigationBarTitleText: '我的收藏' } })

const list = ref<any[]>([])
const loading = ref(true)

async function fetchCollections() {
  try {
    const data = await getCollectionList()
    list.value = data.filter(item => item.article).map(item => ({
      _id: item.article!._id,
      title: item.article!.title,
      category: item.article!.category,
      views: item.article!.views,
    }))
  } catch (e) {
    console.error('获取收藏列表失败:', e)
  } finally {
    loading.value = false
  }
}

onShow(() => { fetchCollections() })

function goDetail(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view v-if="list.length === 0" class="empty">
      <view class="i-carbon-favorite text-5xl text-gray-700" />
      <text class="empty-text">还没有收藏攻略</text>
    </view>

    <view class="list" v-else>
      <ContentCard v-for="item in list" :key="item._id"
        :id="item._id" :title="item.title" :category="item.category" :views="item.views" :cover="item.cover"
        @click="goDetail(item._id)" />
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding: 16px; }
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 0; }
.empty-text { margin-top: 12px; font-size: 14px; color: #6B6B6B; }
.list { display: flex; flex-direction: column; gap: 12px; }
</style>
