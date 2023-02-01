import { Item } from '../types'

export const createItem = (): Item => {
  const creationDate = Date.now()
  const id = Math.ceil(Math.random() * creationDate).toString()

  return {
    id,
    title: 'Title',
    target: { link: 'copy link here', openInNewTab: true },
    updatedAt: creationDate,
    blockType: 'link',
  }
}
