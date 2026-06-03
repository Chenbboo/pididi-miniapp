<script lang="ts" setup>
import DestinationCard from '@/components/destination-card.vue'
import { getDestinationList } from '@/api/cloud/destinations'

defineOptions({ name: 'DestinationList' })
definePage({ style: { navigationBarTitleText: '目的地' } })

const destinations = ref<any[]>([])
const loading = ref(true)

async function fetchDestinations() {
  try {
    destinations.value = await getDestinationList()
  } catch (e) {
    console.error('获取目的地列表失败:', e)
  } finally {
    loading.value = false
  }
}

onLoad(() => { fetchDestinations() })

function goDetail(id: string) { uni.navigateTo({ url: `/pages/destination/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view class="list">
      <DestinationCard v-for="dest in destinations" :key="dest._id"
        :id="dest._id" :name="dest.name" :name-en="dest.name_en"
        :region="dest.region" :count="dest.article_count || 0" @click="goDetail(dest._id)" />
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding: 16px; }
.list { display: flex; flex-direction: column; gap: 12px; }
</style>
