import { Item } from '../types'

export const createItem = (): Item => {
  const creationDate = Date.now()
  const id = Math.ceil(Math.random() * creationDate).toString()

  return {
    id,
    title: '',
    link: { link: null, openInNewTab: false },
    updatedAt: creationDate,
    image: {
      type: 'image',
      name: '',
      extension: '',
      size: 0,
    },
  }
}
