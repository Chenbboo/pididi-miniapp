/**
 * 登录工具 — 双端统一登录接口
 *
 * 使用条件编译处理微信 wx.login 和抖音 tt.login 差异
 * 调用方无需关心平台：import { miniLogin } from '@/utils/login' 即可
 */

/**
 * 获取小程序登录凭证
 * - 微信：调用 wx.login
 * - 抖音：调用 tt.login
 */
export function getMiniCode(): Promise<{ code: string }> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success: (res) => resolve({ code: res.code }),
      fail: (err) => reject(err),
    })
    // #endif

    // #ifdef MP-TOUTIAO
    uni.login({
      provider: 'toutiao',
      success: (res) => resolve({ code: res.code }),
      fail: (err) => reject(err),
    })
    // #endif
  })
}

/**
 * 获取用户信息（头像、昵称）
 * - 微信：wx.getUserProfile 或 <button open-type="getUserInfo">
 * - 抖音：tt.getUserInfo
 */
export function getMiniUserInfo(): Promise<UniApp.GetUserInfoRes> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.getUserInfo({
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    })
    // #endif

    // #ifdef MP-TOUTIAO
    uni.getUserInfo({
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    })
    // #endif
  })
}

/**
 * 一键登录（简化流程）
 * 获取 code → 返回，由调用方传给后端换取 token
 */
export async function miniLogin(): Promise<{ code: string }> {
  const res = await getMiniCode()
  console.log('miniLogin code:', res.code)
  return res
}
