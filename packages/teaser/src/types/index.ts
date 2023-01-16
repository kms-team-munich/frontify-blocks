import { SearchResult } from '@frontify/fondue'
import { BlockProps } from '@frontify/guideline-blocks-settings'
import {
  AppBridgeBlock,
  Asset,
  AssetChooserOptions,
} from '@frontify/app-bridge'
import { CSSProperties } from 'react'

enum TeaserBackground {
  Dark = 'Dark',
  Light = 'Light',
  Highlight = 'Highlight',
}

type AssetEditProps = BlockProps & {
  itemId: string
  disabled?: boolean
  assetChooserOptions: AssetChooserOptions
  buttonLabel?: string
}

type TeaserItemProps = {
  appBridge: AppBridgeBlock
  item?: Omit<Item, 'updatedAt'>
}

type TeaserItemEditProps = TeaserItemProps & {
  onLinkModified: (value: SearchResult | null) => void
  onTitleModified: (title: string) => void
  onOpenInNewTabModified: (value: boolean) => void
  onBlockTypeModified: (value: string | number | undefined) => void
  onRemoveItem: (id: string) => void
}

type IconProps = {
  style?: CSSProperties
  className?: string
}

type TeaserIconProps = {
  icon: Asset
  item?: Omit<Item, 'updatedAt'>
}

type Link = {
  link: SearchResult
  openInNewTab: boolean
}

type Item = {
  id: string
  title: string
  target: Link
  updatedAt: number
  blockType: string | number | undefined
}

type Settings = {
  title: string
  copy: string
  items: Item[]
  footer: string
  background: TeaserBackground
  backgroundGlobal: boolean
}

export { TeaserBackground }
export type {
  AssetEditProps,
  TeaserItemProps,
  TeaserItemEditProps,
  TeaserIconProps,
  IconProps,
  Item,
  Settings,
}
