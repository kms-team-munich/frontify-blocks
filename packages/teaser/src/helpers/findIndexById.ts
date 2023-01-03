import { Key } from 'react'
import { Item } from '../types'

export const findIndexById = (content: Item[], id: Key): number =>
  content.findIndex((item) => item.id === id)
