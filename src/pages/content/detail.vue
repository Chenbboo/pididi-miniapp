<script lang="ts" setup>
import CtaBottom from '@/components/cta-bottom.vue'
import CtaInline from '@/components/cta-inline.vue'
import CtaPopup from '@/components/cta-popup.vue'
import { createShareConfig } from '@/utils/share'

defineOptions({ name: 'ContentDetail' })
definePage({ style: { navigationBarTitleText: '' } })

// 双端分享：微信 onShareAppMessage 和 抖音 onShareAppMessage 共用配置
onShareAppMessage(() => {
  return createShareConfig({
    title: article.value.title,
    path: `/pages/content/detail?id=${article.value.id}`,
  })
})

const article = ref({
  id: 1,
  title: '胡志明市顶级酒店盘点 | 住在传奇里',
  source: 'PiDiDi骑士俱乐部',
  datetime: '2026-06-01',
  content: '<p>胡志明市（西贡）的顶级酒店不仅是一处下榻之所，更是这座城市百年殖民历史与法式优雅的缩影。</p><p>从西贡柏悦（Park Hyatt Saigon）的经典殖民风格到西贡万韵酒店（The Reverie Saigon）的极致奢华，每一家酒店都有独特的故事。</p><p>推荐入住西贡柏悦的总统套房，私人管家服务，顶楼泳池俯瞰城市天际线，距离歌剧院仅几步之遥。</p>',
})

const showPopup = ref(false)
let popupTimer: ReturnType<typeof setTimeout> | null = null

onLoad(() => {
  uni.setNavigationBarTitle({ title: article.value.title })
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
        <text>{{ article.source }}</text>
        <text>{{ article.datetime }}</text>
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
