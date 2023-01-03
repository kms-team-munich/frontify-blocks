import { SearchResult } from '@frontify/fondue'

enum TeaserItemMode {
  Edit = 'Edit',
  View = 'View',
  Create = 'Create',
}

enum TeaserBackground {
  Dark = 'Dark',
  Light = 'Light',
  Highlight = 'Highlight',
}

type TeaserItemProps = {
  item?: Omit<Item, 'updatedAt'>
  mode: TeaserItemMode
  onLinkModified?: (value: SearchResult | null) => void
  onTitleModified?: (title: string) => void
  onOpenInNewTabModified?: (value: boolean) => void
  onRemoveItem?: (id: string) => void
}

type Link = {
  link: SearchResult | null
  openInNewTab: boolean
}

type Item = {
  id: string
  title: string
  link: Link
  updatedAt: number
}

type Settings = {
  headline: string
  copy: string
  items: Item[]
  footer: string
  background: TeaserBackground
  backgroundGlobal: boolean
}

export { TeaserItemMode, TeaserBackground }
export type { TeaserItemProps, Item, Settings }
