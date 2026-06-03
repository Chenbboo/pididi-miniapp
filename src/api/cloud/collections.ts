// 用户收藏 API
import type { Article } from './types/article'

const collectionObj = uniCloud.importObject('collection')

export interface CollectionItem {
  _id: string
  user_id: string
  article_id: string
  create_date: number
  article: Article | null
}

/** 获取收藏列表 */
export function getCollectionList(page = 1) {
  return collectionObj.list({ page }) as Promise<CollectionItem[]>
}

/** 切换收藏状态 */
export function toggleCollection(articleId: string) {
  return collectionObj.toggle({ article_id: articleId }) as Promise<{ collected: boolean }>
}

/** 检查是否已收藏 */
export function checkCollected(articleId: string) {
  return collectionObj.check({ article_id: articleId }) as Promise<{ collected: boolean }>
}
