import { TeaserItemEditProps } from '../types'
import { ImageEdit } from './ImageEdit'
import { useBlockAssets } from '@frontify/app-bridge'
import {
  Button,
  ButtonSize,
  LinkChooser,
  MultiInput,
  MultiInputLayout,
  TextInput,
} from '@frontify/fondue'

import { FC, useState } from 'react'

export const TeaserItemEdit: FC<TeaserItemEditProps> = ({
  item,
  onTitleModified,
  onLinkModified,
  onRemoveItem,
  onOpenInNewTabModified,
  appBridge,
}) => {
  const [title, setTitle] = useState(item?.title)
  const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge)

  const onTitleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    if (onTitleModified) onTitleModified(value)
  }

  const onTitleChange = (newValue: string) => {
    setTitle(newValue)
    if (onTitleModified) onTitleModified(newValue)
  }

  const deleteAssets = (id: string) => {
    const assets = blockAssets[id].map((asset) => asset.id)
    deleteAssetIdsFromKey(id, assets)
  }

  const onDelete = () => {
    if (item) {
      onRemoveItem(item.id)
      deleteAssets(item.id)
    }
  }

  return (
    <div className="tw-relative tw-z-10 tw-p-5 hover:tw-cursor-pointer tw-border tw-border-dashed tw-border-[rgba(0,0,0,0.3)] hover:tw-border-black tw-flex tw-flex-col tw-gap-2">
      <MultiInput layout={MultiInputLayout.Columns}>
        <TextInput
          value={title}
          onChange={onTitleChange}
          onBlur={onTitleBlur}
        />
        {onLinkModified && onOpenInNewTabModified && (
          <LinkChooser
            onLinkChange={onLinkModified}
            onOpenInNewTabChange={onOpenInNewTabModified}
            openInNewTab={item?.link?.openInNewTab || false}
          />
        )}
        <ImageEdit appBridge={appBridge} itemId={item?.id || 'default'} />
      </MultiInput>
      <div className="tw-mt-auto tw-self-end">
        <Button size={ButtonSize.Small} onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}
