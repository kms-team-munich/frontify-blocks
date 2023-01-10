import { Key } from 'react'
import { Item } from '../types'

export const findIndexById = (items: Item[], id: Key): number =>
  items.findIndex((item) => item.id === id)
