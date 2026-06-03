<script lang="ts" setup>
import CtaBottom from '@/components/cta-bottom.vue'
import CtaInline from '@/components/cta-inline.vue'
import CtaPopup from '@/components/cta-popup.vue'
import { createShareConfig } from '@/utils/share'
import { getArticleDetail } from '@/api/cloud/articles'
import { recordBrowse } from '@/api/cloud/history'
import { checkCollected, toggleCollection } from '@/api/cloud/collections'

defineOptions({ name: 'ContentDetail' })
definePage({ style: { navigationBarTitleText: '' } })

const article = ref({
  _id: '',
  title: '加载中...',
  content: '',
  category: '',
  views: 0,
  collects: 0,
  publish_date: 0,
})
const collected = ref(false)
const showPopup = ref(false)
let popupTimer: ReturnType<typeof setTimeout> | null = null

async function fetchDetail(id: string) {
  try {
    const data = await getArticleDetail(id)
    article.value = data
    uni.setNavigationBarTitle({ title: data.title })
    recordBrowse(id).catch(() => {})
    try { const c = await checkCollected(id); collected.value = c.collected } catch {}
  } catch (e) {
    console.error('获取文章详情失败:', e)
  }
}

async function onToggleCollect() {
  try {
    const result = await toggleCollection(article.value._id)
    collected.value = result.collected
    if (result.collected) { uni.showToast({ title: '已收藏', icon: 'success' }) }
    else { uni.showToast({ title: '已取消收藏', icon: 'none' }) }
  } catch (e) {
    uni.showToast({ title: '请先登录', icon: 'none' })
  }
}

onShareAppMessage(() => {
  return createShareConfig({
    title: article.value.title,
    path: `/pages/content/detail?id=${article.value._id}`,
  })
})

onLoad((options: any) => {
  const id = options?.id
  if (id) fetchDetail(id)
  popupTimer = setTimeout(() => { showPopup.value = true }, 15000)
})

onUnload(() => { if (popupTimer) clearTimeout(popupTimer) })
</script>

<template>
  <view class="page">
    <view class="cover">
      <view class="i-carbon-image text-6xl text-gray-700" />
    </view>

    <view class="header">
      <text class="title">{{ article.title }}</text>
      <view class="meta">
        <text>{{ article.category }}</text>
        <text>{{ article.views }} 次浏览</text>
      </view>
    </view>

    <view class="body">
      <rich-text :nodes="article.content" class="content" />
    </view>

    <CtaInline />

    <view class="body">
      <rich-text :nodes="article.content" class="content" />
    </view>

    <CtaPopup :show="showPopup" @close="showPopup = false" />
    <CtaBottom />
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; }
.cover { position: relative; height: 192px; overflow: hidden; background: #1A1A1A; display: flex; align-items: center; justify-content: center; }
.header { padding: 20px 16px 0; }
.title { font-size: 20px; font-weight: bold; color: #E5E5E5; }
.meta { display: flex; align-items: center; gap: 12px; margin-top: 12px; font-size: 14px; color: #6B6B6B; }
.body { padding: 16px; }
.content { font-size: 14px; line-height: 1.8; color: #999; }
</style>
