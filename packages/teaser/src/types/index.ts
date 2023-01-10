import { AssetType, SearchResult } from '@frontify/fondue'
import { BlockProps } from '@frontify/guideline-blocks-settings'
import { AppBridgeBlock } from '@frontify/app-bridge'

enum TeaserBackground {
  Dark = 'Dark',
  Light = 'Light',
  Highlight = 'Highlight',
}

type ImageEditProps = BlockProps & {
  itemId: string
}

type TeaserItemProps = {
  appBridge: AppBridgeBlock
  item?: Omit<Item, 'updatedAt'>
}

type TeaserItemEditProps = TeaserItemProps & {
  onLinkModified: (value: SearchResult | null) => void
  onTitleModified: (title: string) => void
  onOpenInNewTabModified: (value: boolean) => void
  onRemoveItem: (id: string) => void
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
  image: AssetType
}

type Settings = {
  headline: string
  copy: string
  items: Item[]
  footer: string
  background: TeaserBackground
  backgroundGlobal: boolean
}

export { TeaserBackground }
export type {
  ImageEditProps,
  TeaserItemProps,
  TeaserItemEditProps,
  Item,
  Settings,
}
