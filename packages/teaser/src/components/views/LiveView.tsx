import { useBlockSettings } from '@frontify/app-bridge'
import { TeaserItem } from '../TeaserItem'
import { serialize } from '../../helpers'
import parseHtml from 'html-react-parser'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Item, RichText, Settings, TeaserBackground } from '../../types'
import { FC } from 'react'

export const LiveView: FC<BlockProps> = ({ appBridge }) => {
  const [blockSettings] = useBlockSettings<Settings>(appBridge)
  const { items, title, copy, footer, background, backgroundGlobal } =
    blockSettings

  // Styling
  const containerClassesArray = ['tw-flex tw-flex-col tw-gap-8']
  const headerClassesArray = ['tw-flex tw-flex-col tw-gap-6']
  const teaserClassesArray = ['tw-grid tw-grid-cols-2']

  let teaser = ''
  let container = ''
  let header = ''

  if (backgroundGlobal) {
    if (background === TeaserBackground.Light) {
      container = 'tw-bg-zeiss-gray-2 tw-text-zeiss-gray-19'
      teaser = 'tw-border-t tw-border-white tw-bg-white tw-gap-px'
    } else if (background === TeaserBackground.Dark) {
      container = 'tw-bg-zeiss-gray-21 tw-text-zeiss-gray-4'
      teaser =
        'tw-border-t tw-border-zeiss-gray-19 tw-bg-zeiss-gray-19 tw-gap-px'
    } else if (background === TeaserBackground.Azure) {
      container = 'tw-bg-zeiss-azure-90 tw-text-zeiss-gray-4'
      teaser = 'tw-border-t tw-border-white tw-bg-white tw-gap-px'
    }

    header = 'tw-pt-3 tw-px-4'
  } else {
    teaser = 'tw-gap-2'
  }

  containerClassesArray.push(container)
  teaserClassesArray.push(teaser)
  headerClassesArray.push(header)

  const containerClasses = containerClassesArray.join(' ')
  const headerClasses = headerClassesArray.join(' ')
  const teaserClasses = teaserClassesArray.join(' ')

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <div className={containerClasses}>
        <div className={headerClasses}>
          <div className="tw-type-headline">{title}</div>
          {copy && (
            <div className="tw-max-w-[600px] tw-whitespace-pre">
              {parseHtml(serialize({ children: JSON.parse(copy) } as RichText))}
            </div>
          )}
        </div>
        <div className={teaserClasses}>
          {items?.map((item: Item) => {
            return (
              <TeaserItem key={item.id} item={item} appBridge={appBridge} />
            )
          })}
        </div>
      </div>
      {footer && (
        <div className="tw-max-w-[600px] tw-whitespace-pre">
          {parseHtml(serialize({ children: JSON.parse(footer) } as RichText))}
        </div>
      )}
    </div>
  )
}
