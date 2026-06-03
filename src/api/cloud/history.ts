// 浏览历史 API - clientDB 直连
const db = uniCloud.database()

export async function getHistoryList() {
  const res = await db.collection('browse_history').orderBy('browse_time', 'desc').get()
  return res.result?.data || res.data || []
}

export async function recordBrowse(articleId: string) {
  const exist = await db.collection('browse_history').where({ article_id: articleId }).count()
  const total = exist.result?.total || exist.total || 0
  if (total > 0) {
    const list = await db.collection('browse_history').where({ article_id: articleId }).get()
    const data = list.result?.data || list.data || []
    if (data.length > 0) {
      await db.collection('browse_history').doc(data[0]._id).update({ browse_time: Date.now() })
    }
  } else {
    await db.collection('browse_history').add({ article_id: articleId, browse_time: Date.now() })
  }
  return { ok: true }
}
