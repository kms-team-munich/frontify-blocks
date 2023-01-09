import { TeaserBackground, TeaserItemProps } from '../types'
import { Button, ButtonSize, LinkChooser, TextInput } from '@frontify/fondue'
import { SettingsContext } from '../SettingsContext'

import { useContext, useState } from 'react'

export const TeaserItemEdit = ({
  item,
  onTitleModified,
  onLinkModified,
  onOpenInNewTabModified,
}: TeaserItemProps) => {
  const { background } = useContext(SettingsContext)
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

  const containerClasses = [
    'tw-p-4 hover:cursor-pointer',
    background === TeaserBackground.Light &&
      'tw-bg-zeiss-gray-2 text-zeiss-gray-19 hover:tw-bg-zeiss-gray-5',
    background === TeaserBackground.Dark &&
      'tw-bg-zeiss-gray-21 text-zeiss-gray-4 hover:tw-bg-zeiss-black',
  ].join(' ')

  return (
    <div className={containerClasses}>
      <div className="tw-h-full tw-grid tw-grid-cols-2 tw-gap-2">
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
        {/* <span className="tw-mt-auto tw-self-end">
          <Button size={ButtonSize.Small}>Delete</Button>
        </span> */}
      </div>
    </div>
  )
}
