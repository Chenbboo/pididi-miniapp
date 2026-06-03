<script lang="ts" setup>
import NavBar from '@/components/nav-bar.vue'
import SearchBar from '@/components/search-bar.vue'
import ContentCard from '@/components/content-card.vue'
import { getHotArticles } from '@/api/cloud/articles'
import type { Article } from '@/api/cloud/types'

defineOptions({ name: 'Home' })
definePage({
  type: 'home',
  style: { navigationStyle: 'custom', navigationBarTitleText: 'PiDiDi骑士俱乐部' },
})

const banners = ref([
  { id: 1, title: '胡志明市 · 东方巴黎' },
  { id: 2, title: '法式风情 · 西贡夜未眠' },
  { id: 3, title: '高端定制 · 不一样的越南' },
])

const bannerCurrent = ref(0)
const hotList = ref<Article[]>([])
const loading = ref(true)

async function fetchHot() {
  try {
    hotList.value = await getHotArticles(6)
  } catch (e) {
    console.error('获取热门文章失败:', e)
  } finally {
    loading.value = false
  }
}

onLoad(() => { fetchHot() })

function goSearch() { uni.navigateTo({ url: '/pages/search/index' }) }
function goContent(id: string) { uni.navigateTo({ url: `/pages/content/detail?id=${id}` }) }
</script>

<template>
  <view class="page">
    <NavBar show-logo title="PiDiDi骑士俱乐部" />
    <SearchBar @search="goSearch" />

    <view class="banner-wrap">
      <swiper
        class="swiper" indicator-dots indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#C9A84C"
        autoplay circular interval="3000"
        @change="(e: any) => bannerCurrent = e.detail.current">
        <swiper-item v-for="banner in banners" :key="banner.id">
          <view class="banner-slide">
            <view class="banner-img">
              <view class="i-carbon-image text-5xl text-gray-700" />
            </view>
            <view class="banner-title">
              <text class="banner-text">{{ banner.title }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="hot">
      <view class="hot-header">
        <text class="hot-title">热门推荐</text>
        <text class="hot-more">查看全部 →</text>
      </view>
      <view class="hot-list">
        <ContentCard v-for="item in hotList" :key="item._id"
          :id="item._id" :title="item.title" :category="item.category" :views="item.views"
          @click="goContent(item._id)" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; padding-bottom: 64px; }
.banner-wrap { margin-top: 12px; padding: 0 16px; }
.swiper { width: 100%; height: 144px; overflow: hidden; border-radius: 12px; }
.banner-slide { position: relative; width: 100%; height: 100%; }
.banner-img { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #1A1A1A; }
.banner-title { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 12px; }
.banner-text { font-size: 14px; font-weight: 500; color: #fff; }
.hot { margin-top: 24px; padding: 0 16px; }
.hot-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.hot-title { font-size: 18px; font-weight: bold; color: #E5E5E5; }
.hot-more { font-size: 14px; color: #6B6B6B; }
.hot-list { display: flex; flex-direction: column; gap: 12px; }
</style>
