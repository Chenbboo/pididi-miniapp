<script lang="ts" setup>
import ContentCard from '@/components/content-card.vue'
import { getDestinationDetail } from '@/api/cloud/destinations'
import { getArticleList } from '@/api/cloud/articles'

defineOptions({ name: 'DestinationDetail' })
definePage({ style: { navigationBarTitleText: '' } })

const dest = ref({ name: '加载中...', nameEn: '', intro: '' })
const contents = ref<any[]>([])

onLoad((options: any) => {
  const id = options?.id
  if (id) fetchDetail(id)
})

async function fetchDetail(id: string) {
  try {
    const data = await getDestinationDetail(id)
    dest.value = {
      name: data.name || '加载中...',
      nameEn: data.name_en || '',
      intro: data.summary || '',
    }
    uni.setNavigationBarTitle({ title: data.name })
    // 获取该目的地相关文章
    const articles = await getArticleList({ pageSize: 5, sort: 'hot' })
    contents.value = articles.list
  } catch (e) {
    console.error('获取目的地详情失败:', e)
  }
}

function goDetail(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
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
        <ContentCard v-for="item in contents" :key="item._id"
          :id="item._id" :title="item.title" :category="item.category" :views="item.views"
          @click="goDetail(item._id)" />
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
