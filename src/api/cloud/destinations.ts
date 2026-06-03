// 目的地 API - clientDB 直连
const db = uniCloud.database()

export async function getDestinationList() {
  const res = await db.collection('destinations').where({ status: 'active' }).orderBy('sort', 'asc').get()
  return res.result?.data || res.data || []
}

export async function getDestinationDetail(id: string) {
  const res = await db.collection('destinations').doc(id).get()
  const data = res.result?.data || res.data
  return Array.isArray(data) ? data[0] : data
}
