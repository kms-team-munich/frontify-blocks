import { TeaserBackground, TeaserItemMode, TeaserItemProps } from '../types'
import { Button, ButtonSize, LinkChooser, TextInput } from '@frontify/fondue'
import { SettingsContext } from '../SettingsContext'

import { useContext } from 'react'

export const TeaserItem = ({
  item,
  mode,
  onTitleModified,
  onLinkModified,
  onOpenInNewTabModified,
}: TeaserItemProps) => {
  const { background } = useContext(SettingsContext)

  const containerClasses = [
    'tw-h-[200px] tw-p-4 hover:cursor-pointer',
    background === TeaserBackground.Light &&
      'tw-bg-zeiss-gray-2 text-zeiss-gray-19 hover:tw-bg-zeiss-gray-5',
    background === TeaserBackground.Dark &&
      'tw-bg-zeiss-gray-21 text-zeiss-gray-4 hover:tw-bg-zeiss-black',
  ].join(' ')

  return (
    <div className={containerClasses}>
      {mode === TeaserItemMode.Edit && (
        <div className="tw-h-full tw-flex tw-flex-col tw-gap-2">
          <TextInput value={item?.title} onChange={onTitleModified} />
          {onLinkModified && onOpenInNewTabModified && (
            <LinkChooser
              onLinkChange={onLinkModified}
              onOpenInNewTabChange={onOpenInNewTabModified}
              openInNewTab={item?.link?.openInNewTab || false}
            />
          )}
          <span className="tw-mt-auto tw-self-end">
            <Button size={ButtonSize.Small}>Delete</Button>
          </span>
        </div>
      )}

      {mode === TeaserItemMode.View && <h2>{item?.title}</h2>}
    </div>
  )
}
