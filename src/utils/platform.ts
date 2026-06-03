/**
 * 平台工具 — 统一微信/抖音差异
 * 通过条件编译在编译时决定代码走向，运行时零开销
 */

/** 当前平台 */
export const enum Platform {
  WEIXIN = 'weixin',
  TOUTIAO = 'toutiao',
  H5 = 'h5',
}

/** 获取当前平台标识 */
export function getPlatform(): Platform {
  // #ifdef MP-WEIXIN
  return Platform.WEIXIN
  // #endif
  // #ifdef MP-TOUTIAO
  return Platform.TOUTIAO
  // #endif
  // #ifndef MP-WEIXIN || MP-TOUTIAO
  return Platform.H5
  // #endif
}

/** 是否微信小程序 */
export function isWeixin(): boolean {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  return false
}

/** 是否抖音小程序 */
export function isToutiao(): boolean {
  // #ifdef MP-TOUTIAO
  return true
  // #endif
  return false
}
