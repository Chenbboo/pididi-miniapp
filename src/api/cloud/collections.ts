// 用户收藏 API - clientDB 直连
const db = uniCloud.database()

export async function getCollectionList() {
  const res = await db.collection('user_collections').orderBy('create_date', 'desc').get()
  return res.result?.data || res.data || []
}

export async function toggleCollection(articleId: string) {
  const exist = await db.collection('user_collections').where({ article_id: articleId }).count()
  const total = exist.result?.total || exist.total || 0
  if (total > 0) {
    const list = await db.collection('user_collections').where({ article_id: articleId }).get()
    const data = list.result?.data || list.data || []
    if (data.length > 0) {
      await db.collection('user_collections').doc(data[0]._id).remove()
      await db.collection('articles').doc(articleId).update({ collects: db.command.inc(-1) })
    }
    return { collected: false }
  } else {
    await db.collection('user_collections').add({ article_id: articleId, create_date: Date.now() })
    await db.collection('articles').doc(articleId).update({ collects: db.command.inc(1) })
    return { collected: true }
  }
}

export async function checkCollected(articleId: string) {
  const res = await db.collection('user_collections').where({ article_id: articleId }).count()
  return { collected: (res.result?.total || res.total || 0) > 0 }
}
