// 目的地 API
import type { Destination } from './types/destination'

const destinationObj = uniCloud.importObject('destination')

/** 获取所有目的地 */
export function getDestinationList() {
  return destinationObj.list() as Promise<Destination[]>
}

/** 获取目的地详情 */
export function getDestinationDetail(id: string) {
  return destinationObj.detail({ id }) as Promise<Destination>
}
