import { TeaserBackground, TeaserItemProps } from '../types'
import { SettingsContext } from '../SettingsContext'

import { useContext } from 'react'

export const TeaserItem = ({ item }: Pick<TeaserItemProps, 'item'>) => {
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
      <h2>{item?.title}</h2>
    </div>
  )
}
