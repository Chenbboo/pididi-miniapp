// 统一类型定义

export interface Article {
  _id: string
  title: string
  category: string
  cover?: string
  summary?: string
  content?: string
  views: number
  collects: number
  publish_date: number
  status: string
}

export interface Destination {
  _id: string
  name: string
  name_en?: string
  region?: string
  cover?: string
  summary?: string
  article_count?: number
  sort?: number
}
