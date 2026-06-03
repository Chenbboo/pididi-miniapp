<script lang="ts" setup>
defineOptions({ name: 'Consult' })
definePage({ style: { navigationBarTitleText: '专属定制' } })

const highlights = [
  { icon: 'i-carbon-star', title: '一对一专属定制', desc: '不是跟团游，完全按你的喜好来' },
  { icon: 'i-carbon-map', title: '本地管家全程陪同', desc: '越南本地团队，说中文不用愁' },
  { icon: 'i-carbon-security', title: '高端资源直连', desc: '酒店、游艇、球场、米其林，一手资源' },
  { icon: 'i-carbon-time', title: '省心不省品质', desc: '机票、签证、专车、管家，全交给我们' },
]

function copyWechat() {
  uni.setClipboardData({ data: 'PiDiDiVIP', success: () => uni.showToast({ title: '已复制微信号', icon: 'success' }) })
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="hero-title">你的越南之旅</text>
      <text class="hero-sub">我们一对一规划</text>
    </view>

    <view class="qr-box">
      <view class="qr">
        <view class="i-carbon-qr-code text-6xl text-gray-600" />
        <text class="qr-text">扫码添加企业微信</text>
      </view>
    </view>

    <view class="points">
      <view v-for="(item, idx) in highlights" :key="idx" class="point">
        <view :class="item.icon" class="point-icon" />
        <view>
          <text class="point-title">{{ item.title }}</text>
          <text class="point-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <view class="btn" @click="copyWechat">
      <text class="btn-text">一键复制微信号</text>
    </view>

    <view class="faq">
      <text class="faq-title">常见问题</text>
      <view class="faq-list">
        <view class="faq-item">
          <text class="faq-q">Q: 怎么收费？</text>
          <text class="faq-a">A: 添加微信后根据你的需求定制方案和报价</text>
        </view>
        <view class="faq-item">
          <text class="faq-q">Q: 包含机票吗？</text>
          <text class="faq-a">A: 可以代订商务舱/头等舱，也可以只做地接</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; display: flex; flex-direction: column; align-items: center; padding: 0 24px 32px; }
.hero { margin-top: 32px; text-align: center; }
.hero-title { font-size: 24px; font-weight: bold; color: #E5E5E5; }
.hero-sub { display: block; margin-top: 8px; font-size: 18px; color: #999; }
.qr-box { margin-top: 32px; }
.qr { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 224px; height: 224px; border-radius: 16px; background: #1A1A1A; }
.qr-text { margin-top: 8px; font-size: 12px; color: #6B6B6B; }
.points { width: 100%; margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
.point { display: flex; align-items: flex-start; gap: 12px; border-radius: 12px; background: #1A1A1A; padding: 16px; }
.point-icon { font-size: 20px; color: #C9A84C; margin-top: 2px; }
.point-title { font-size: 14px; font-weight: 500; color: #E5E5E5; }
.point-desc { display: block; margin-top: 2px; font-size: 12px; color: #6B6B6B; }
.btn { width: 100%; margin-top: 32px; border-radius: 999px; background: #C9A84C; padding: 14px 0; text-align: center; }
.btn-text { font-size: 16px; font-weight: 500; color: #0D0D0D; }
.faq { width: 100%; margin-top: 24px; }
.faq-title { font-size: 14px; font-weight: 500; color: #ccc; }
.faq-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.faq-item { border-radius: 12px; background: #1A1A1A; padding: 12px; }
.faq-q { font-size: 12px; font-weight: 500; color: #ccc; }
.faq-a { display: block; margin-top: 4px; font-size: 12px; color: #6B6B6B; }
</style>
