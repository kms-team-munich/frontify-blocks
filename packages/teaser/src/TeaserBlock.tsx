import { FC } from 'react'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'

import { SettingsContext } from './SettingsContext'
import { TeaserItem } from './components/TeaserItem'
import { TeaserItemEdit } from './components/TeaserItemEdit'
import { createItem, updateItemById } from './helpers'

import {
  Button,
  ButtonSize,
  DragProperties,
  ItemDragState,
  OrderableList,
  OrderableListItem,
} from '@frontify/fondue'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Item, Settings, TeaserBackground } from './types'

import 'tailwindcss/tailwind.css'

export const TeaserBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings, setBlockSettings] =
    useBlockSettings<Settings>(appBridge)

  const { items, title, copy, footer, background, backgroundGlobal } =
    blockSettings

  const orderableListItems: OrderableListItem<Item>[] =
    items?.map((item: Item, index: number) => {
      return {
        ...item,
        key: item.id,
        alt: item.title,
        sort: index,
      }
    }) || []

  const addNewItem = (): void => {
    const newItem = createItem()
    const updatedItems = items?.length ? [...items, newItem] : [newItem]
    setBlockSettings({ items: updatedItems })
  }

  const updateItem = (
    idToUpdate: string,
    properties: Partial<Item>
  ): Promise<void> => {
    const mappedItems = items ? items : []
    const updatedItems = updateItemById(mappedItems, idToUpdate, properties)
    return setBlockSettings({
      items: updatedItems,
    })
  }

  const removeItem = (idToDelete: string): Promise<void> => {
    return setBlockSettings({
      items: items.filter(({ id }) => id !== idToDelete),
    })
  }

  const sortItems = (
    modifiedItems: OrderableListItem<Item>[]
  ): Promise<void> => {
    const modifiedArray = items?.map((item, index) => {
      const matchingModifiedItem = modifiedItems.find(
        (modifiedItem) => modifiedItem.id === item.id
      )
      if (matchingModifiedItem) {
        return { ...matchingModifiedItem }
      }

      return { ...item, sort: index }
    })

    modifiedArray.sort(
      (previousItem, currentItem) => previousItem.sort - currentItem.sort
    )

    return setBlockSettings({ items: modifiedArray })
  }

  const renderEditable = (
    { title, id, target, blockType }: OrderableListItem<Item>,
    { componentDragState }: DragProperties
  ) => {
    const content = (
      <TeaserItemEdit
        key={id}
        item={{ title, id, target, blockType }}
        onTitleModified={(title) => updateItem(id, { title })}
        onLinkModified={(value) => {
          if (value) {
            updateItem(id, { target: { ...target, link: value } })
          }
        }}
        onOpenInNewTabModified={(value) =>
          updateItem(id, { target: { ...target, openInNewTab: value } })
        }
        onBlockTypeModified={(value) => updateItem(id, { blockType: value })}
        onRemoveItem={removeItem}
        appBridge={appBridge}
      />
    )

    // Preview is rendered in external DOM, requires own context provider
    return componentDragState === ItemDragState.Preview ? (
      <SettingsContext.Provider value={blockSettings}>
        {content}
      </SettingsContext.Provider>
    ) : (
      content
    )
  }

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
    <SettingsContext.Provider value={blockSettings}>
      {!isEditing && (
        <div className="tw-flex tw-flex-col tw-gap-6">
          <div className={containerClasses}>
            <div className={headerClasses}>
              <div className="tw-type-headline">{title}</div>
              {copy && <p>{copy}</p>}
            </div>
            <div className={teaserClasses}>
              {items?.map((item: Item) => {
                return (
                  <TeaserItem key={item.id} item={item} appBridge={appBridge} />
                )
              })}
            </div>
          </div>
          <div>{footer}</div>
        </div>
      )}

      {isEditing && (
        <div className="tw-flex tw-flex-col tw-gap-5">
          <OrderableList
            items={orderableListItems}
            dragDisabled={!isEditing}
            renderContent={renderEditable}
            onMove={sortItems}
          />
          <div className="tw-mt-auto tw-self-end">
            <Button size={ButtonSize.Medium} onClick={() => addNewItem()}>
              Add
            </Button>
          </div>
        </div>
      )}
    </SettingsContext.Provider>
  )
}
