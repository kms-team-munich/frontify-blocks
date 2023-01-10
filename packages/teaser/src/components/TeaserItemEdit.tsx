import { TeaserItemProps } from '../types'
import { Button, ButtonSize, LinkChooser, TextInput } from '@frontify/fondue'

import { useState } from 'react'

export const TeaserItemEdit = ({
  item,
  onTitleModified,
  onLinkModified,
  onRemoveItem,
  onOpenInNewTabModified,
}: TeaserItemProps) => {
  const [title, setTitle] = useState(item?.title)

  const onTitleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    if (onTitleModified) onTitleModified(value)
  }

  const onTitleChange = (newValue: string) => {
    setTitle(newValue)
    if (onTitleModified) onTitleModified(newValue)
  }

  return (
    <div className="tw-p-5 hover:tw-cursor-pointer tw-border tw-border-dashed tw-border-[rgba(0,0,0,0.3)] hover:tw-border-black tw-flex tw-flex-col tw-gap-2">
      <div className="tw-h-full tw-grid tw-grid-cols-2 tw-gap-5">
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
      </div>
      <div className="tw-mt-auto tw-self-end">
        <Button
          size={ButtonSize.Small}
          onClick={() => onRemoveItem && item && onRemoveItem(item.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
