import { Item } from '../types'
import { AssetType } from '@frontify/fondue'

export const createItem = (): Item => {
  const creationDate = Date.now()
  const id = Math.ceil(Math.random() * creationDate).toString()

  return {
    id,
    title: '',
    link: { link: null, openInNewTab: false },
    updatedAt: creationDate,
    image: {} as AssetType,
  }
}
