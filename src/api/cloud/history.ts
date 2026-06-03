// 浏览历史 API
import type { Article } from './types/article'

const historyObj = uniCloud.importObject('history')

export interface HistoryItem {
  _id: string
  user_id: string
  article_id: string
  browse_time: number
  article: Article | null
}

/** 获取浏览历史 */
export function getHistoryList(page = 1) {
  return historyObj.list({ page }) as Promise<HistoryItem[]>
}

/** 记录浏览 */
export function recordBrowse(articleId: string) {
  return historyObj.record({ article_id: articleId }) as Promise<{ ok: boolean }>
}
