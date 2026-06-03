<script lang="ts" setup>
import DestinationCard from '@/components/destination-card.vue'

defineOptions({ name: 'DestinationList' })
definePage({ style: { navigationBarTitleText: '目的地' } })

// 第一期只做胡志明市，后续扩展其他城市
const destinations = [
  { id: 'hcmc', name: '胡志明市', nameEn: 'Ho Chi Minh City', region: '南部', count: 18 },
]

function goDetail(id: string) { uni.navigateTo({ url: `/pages/destination/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view class="list">
      <DestinationCard v-for="dest in destinations" :key="dest.id"
        :id="dest.id" :name="dest.name" :name-en="dest.nameEn"
        :region="dest.region" :count="dest.count" @click="goDetail(dest.id)" />
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding: 16px; }
.list { display: flex; flex-direction: column; gap: 12px; }
</style>
