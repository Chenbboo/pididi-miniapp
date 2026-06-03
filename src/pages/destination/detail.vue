<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'

defineOptions({ name: 'DestinationDetail' })
definePage({ style: { navigationBarTitleText: '' } })

const dest = ref({ name: '胡志明市', nameEn: 'Ho Chi Minh City', intro: '胡志明市（西贡）是越南的经济中心，也是高端旅游的门户。从法式殖民建筑到 rooftop 酒吧，从米其林餐厅到私人定制行程，这座城市融合了东方神秘与法式优雅，是高净值人群探索越南的起点。' })

const contents = ref([
  { id: 1, title: '胡志明市顶级酒店盘点 | 住在传奇里', category: '目的地攻略', views: 1280 },
  { id: 2, title: '西贡 rooftop 酒吧指南 | 法式风情夜', category: '主题玩法', views: 756 },
  { id: 3, title: '胡志明市 3 天深度游 | 东方巴黎', category: '行程规划', views: 2103 },
])

onLoad((options: any) => { if (options?.id) uni.setNavigationBarTitle({ title: dest.value.name }) })
function goDetail(id: number) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <view class="cover">
      <view class="i-carbon-image text-6xl text-gray-700" />
      <view class="cover-text">
        <text class="name">{{ dest.name }}</text>
        <text class="name-en">{{ dest.nameEn }}</text>
      </view>
    </view>

    <view class="intro">
      <text class="intro-text">{{ dest.intro }}</text>
    </view>

    <view class="section">
      <text class="section-title">相关攻略</text>
      <view class="section-list">
        <ContentCard v-for="item in contents" :key="item.id"
          :id="item.id" :title="item.title" :category="item.category" :views="item.views"
          @click="goDetail(item.id)" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding-bottom: 16px; }
.cover { position: relative; height: 192px; background: #1A1A1A; display: flex; align-items: center; justify-content: center; }
.cover-text { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 16px; }
.name { font-size: 24px; font-weight: bold; color: #fff; }
.name-en { margin-left: 8px; font-size: 16px; color: rgba(255,255,255,0.6); }
.intro { padding: 16px; }
.intro-text { font-size: 14px; line-height: 1.6; color: #999; }
.section { padding: 0 16px; }
.section-title { font-size: 18px; font-weight: bold; color: #E5E5E5; }
.section-list { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
</style>
