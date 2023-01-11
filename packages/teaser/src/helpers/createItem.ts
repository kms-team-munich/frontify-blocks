import { Item } from '../types'
import { SearchResult } from '@frontify/fondue'

export const createItem = (): Item => {
  const creationDate = Date.now()
  const id = Math.ceil(Math.random() * creationDate).toString()

  return {
    id,
    title: '',
    target: { link: {} as SearchResult, openInNewTab: false },
    updatedAt: creationDate,
    blockType: 'link',
  }
}
