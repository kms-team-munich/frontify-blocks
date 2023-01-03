import { Item } from '../types'

export const updateItemById = (
  array: Item[],
  idToUpdate: string,
  properties: Partial<Item>
): Item[] =>
  array.reduce(
    (acc: Item[], item: Item) =>
      item.id === idToUpdate
        ? [...acc, { ...item, ...properties }]
        : [...acc, item],
    []
  )
