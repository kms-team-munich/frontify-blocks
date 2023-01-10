import { TeaserBackground, TeaserItemProps } from '../types'
import { SettingsContext } from '../SettingsContext'

import { useContext } from 'react'

export const TeaserItem = ({ item }: Pick<TeaserItemProps, 'item'>) => {
  const { background } = useContext(SettingsContext)

  const containerClasses = [
    'tw-h-[200px] tw-py-3 tw-px-4 tw-text-xl hover:cursor-pointer tw-bg-right-bottom tw-bg-no-repeat tw-bg-contain tw-relative tw-transitions-color tw-duration-200',
    background === TeaserBackground.Light &&
      'tw-bg-zeiss-gray-2 tw-text-zeiss-gray-19 hover:tw-bg-zeiss-gray-5',
    background === TeaserBackground.Dark &&
      'tw-bg-zeiss-gray-21 tw-text-zeiss-gray-4 hover:tw-bg-zeiss-black',
  ].join(' ')

  return (
    <div
      className={containerClasses}
      style={{
        backgroundImage:
          'url(https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png)',
      }}
    >
      <span className="">{item?.title}</span>
      <object
        type="image/svg+xml"
        data="https://www.svgrepo.com/show/335868/arrow-right.svg"
        className="tw-w-6 tw-h-6 tw-fill-red-40 tw-absolute tw-left-4 tw-bottom-3"
      />
    </div>
  )
}
