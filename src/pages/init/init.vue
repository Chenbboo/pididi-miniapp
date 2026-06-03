<script lang="ts" setup>
defineOptions({ name: 'InitData' })
definePage({ style: { navigationBarTitleText: '数据初始化' } })

const status = ref('正在初始化数据...')
const done = ref(false)

onLoad(async () => {
  try {
    // 调用 article.seed() 插入测试文章
    const articleObj = uniCloud.importObject('article')
    const articleResult = await articleObj.seed()
    status.value = `文章初始化: ${articleResult.ok ? `已插入 ${articleResult.count} 篇文章` : articleResult.msg}`
    done.value = true
  } catch (e: any) {
    status.value = '初始化失败: ' + (e.message || e)
    done.value = true
  }
})
</script>

<template>
  <view class="page">
    <view class="card">
      <view class="i-carbon-checkmark text-5xl" :style="{ color: done ? '#4CAF50' : '#C9A84C' }" />
      <text class="msg">{{ status }}</text>
      <text v-if="done" class="hint">数据已就绪，返回首页查看</text>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #0D0D0D; display: flex; align-items: center; justify-content: center; padding: 24px; }
.card { display: flex; flex-direction: column; align-items: center; gap: 16px; background: #1A1A1A; border-radius: 12px; padding: 32px; }
.msg { font-size: 16px; font-weight: 500; color: #E5E5E5; text-align: center; }
.hint { font-size: 14px; color: #6B6B6B; }
</style>
