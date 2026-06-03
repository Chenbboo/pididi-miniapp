// 攻略文章 API
import type { Article } from './types/article'

const articleObj = uniCloud.importObject('article')

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

/** 获取文章列表 */
export function getArticleList(params: ArticleListParams = {}) {
  return articleObj.list(params) as Promise<ArticleListResult>
}

/** 获取文章详情 */
export function getArticleDetail(id: string) {
  return articleObj.detail({ id }) as Promise<Article>
}

/** 获取热门文章 */
export function getHotArticles(limit = 6) {
  return articleObj.hot({ limit }) as Promise<Article[]>
}

/** 搜索文章 */
export function searchArticles(keyword: string, page = 1) {
  return articleObj.search({ keyword, page }) as Promise<{ list: Article[]; keyword: string }>
}
