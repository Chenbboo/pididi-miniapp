// 攻略文章 API - 使用 clientDB 直连
import type { Article } from './types/article'

const db = uniCloud.database()

export interface ArticleListParams {
  page?: number
  pageSize?: number
  category?: string
  sort?: 'latest' | 'hot'
}

export interface ArticleListResult {
  list: Article[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

function normalize(article: any): Article {
  return {
    ...article,
    cover: article.cover || article.cover_image || '',
    views: article.views || article.view_count || 0,
    collects: article.collects || article.collect_count || 0,
  }
}

/** 获取文章列表 */
export async function getArticleList(params: ArticleListParams = {}) {
  const { page = 1, pageSize = 10, category, sort = 'latest' } = params
  const skip = (page - 1) * pageSize
  const where: any = { status: 'published' }
  if (category && category !== '全部') where.category = category
  const orderField = sort === 'hot' ? 'views' : 'publish_date'
  const orderDir = 'desc'

  const [listRes, countRes] = await Promise.all([
    db.collection('articles').where(where).orderBy(orderField, orderDir).skip(skip).limit(pageSize).get(),
    db.collection('articles').where(where).count(),
  ])
  return {
    list: (listRes.result?.data || listRes.data || []).map(normalize),
    total: countRes.result?.total || countRes.total || 0,
    page, pageSize,
    hasMore: skip + pageSize < (countRes.result?.total || countRes.total || 0),
  }
}

/** 获取文章详情 */
export async function getArticleDetail(id: string) {
  const res = await db.collection('articles').doc(id).get()
  const data = res.result?.data || res.data
  if (!data || (Array.isArray(data) && data.length === 0)) throw new Error('文章不存在')
  const article = Array.isArray(data) ? data[0] : data
  // 增加浏览
  db.collection('articles').doc(id).update({ views: db.command.inc(1) }).catch(() => {})
  return normalize(article)
}

/** 获取热门文章 */
export async function getHotArticles(limit = 6) {
  const res = await db.collection('articles').where({ status: 'published' }).orderBy('views', 'desc').limit(limit).get()
  return (res.result?.data || res.data || []).map(normalize)
}

/** 搜索文章 */
export async function searchArticles(keyword: string, page = 1) {
  const res = await db.collection('articles').where({
    status: 'published',
    title: db.RegExp({ regexp: keyword, options: 'i' }),
  }).orderBy('publish_date', 'desc').skip((page - 1) * 20).limit(20).get()
  return { list: (res.result?.data || res.data || []).map(normalize), keyword }
}
