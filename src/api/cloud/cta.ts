// CTA 配置 API

const ctaObj = uniCloud.importObject('cta')

export interface CtaConfig {
  _id: string
  type: 'A' | 'B' | 'C' | 'D'
  title?: string
  subtitle?: string
  qrcode_url?: string
  link_url?: string
  trigger_seconds?: number
  enabled: boolean
}

/** 获取所有启用的 CTA 配置 */
export function getCtaConfig() {
  return ctaObj.get() as Promise<CtaConfig[]>
}

/** 获取指定类型的 CTA 配置 */
export function getCtaByType(type: string) {
  return ctaObj.getByType({ type }) as Promise<CtaConfig | null>
}
