// CTA 配置 API - clientDB 直连
const db = uniCloud.database()

export async function getCtaConfig() {
  const res = await db.collection('cta_config').where({ enabled: true }).orderBy('type', 'asc').get()
  return res.result?.data || res.data || []
}

export async function getCtaByType(type: string) {
  const res = await db.collection('cta_config').where({ type, enabled: true }).get()
  const data = res.result?.data || res.data || []
  return data[0] || null
}
