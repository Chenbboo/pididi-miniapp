/**
 * 分享工具 — 双端统一分享接口
 *
 * 微信：wx.shareAppMessage（通过 onShareAppMessage 生命周期）
 * 抖音：tt.shareAppMessage
 *
 * 注意：小程序分享必须通过页面生命周期的 onShareAppMessage 触发，
 * 不能主动调用。此文件提供的是分享内容配置工具。
 */

export interface ShareConfig {
  title: string
  path?: string
  imageUrl?: string
}

/**
 * 创建分享配置（用于页面 onShareAppMessage）
 * 双端通用，抖音自动适配
 *
 * 使用方式：
 *   onShareAppMessage(() => createShareConfig({ title: 'xxx' }))
 */
export function createShareConfig(config: ShareConfig) {
  return {
    title: config.title,
    path: config.path || '/pages/index/index',
    imageUrl: config.imageUrl || '',
  }
}

/**
 * 触发分享（H5 环境或需要主动触发的场景）
 * 小程序中此方法通常无效，分享必须通过右上角菜单
 */
export function triggerShare(config: ShareConfig) {
  // #ifdef H5
  // H5 环境可以通过 Web Share API
  if (navigator.share) {
    navigator.share({
      title: config.title,
      url: config.path || location.href,
    })
  }
  // #endif
}
