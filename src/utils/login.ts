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
 * 一键登录（完整流程）
 * 获取 code → uni-id 换取 token → 返回用户信息
 */
export async function miniLogin(): Promise<{
  uid: string
  token: string
  nickname?: string
  avatar?: string
}> {
  const { code } = await getMiniCode()

  // 调用 uni-id-co 云对象登录
  const uniIdCo = uniCloud.importObject('uni-id-co')
  const result = await uniIdCo.loginByWeixin({ code })

  if (result.errCode) {
    throw new Error(result.errMsg || '登录失败')
  }

  // 存储 token
  uni.setStorageSync('uni_id_token', result.token)
  uni.setStorageSync('uni_id_token_expired', result.tokenExpired || 0)

  return {
    uid: result.uid,
    token: result.token,
    nickname: result.nickname,
    avatar: result.avatar,
  }
}

/**
 * 检查登录状态
 */
export function isLoggedIn(): boolean {
  const token = uni.getStorageSync('uni_id_token')
  return !!token
}

/**
 * 退出登录
 */
export function logout(): void {
  uni.removeStorageSync('uni_id_token')
  uni.removeStorageSync('uni_id_token_expired')
}

/**
 * 获取存储的用户信息
 */
export function getStoredUser(): { uid: string; nickname: string; avatar: string } | null {
  const token = uni.getStorageSync('uni_id_token')
  if (!token) return null
  // uni-id token 可解码获取用户信息
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      uid: payload.uid,
      nickname: payload.nickname || '旅行者',
      avatar: payload.avatar || '',
    }
  } catch {
    return null
  }
}
