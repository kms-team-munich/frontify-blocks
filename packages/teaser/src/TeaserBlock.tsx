import { FC } from 'react'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'

import { SettingsContext } from './SettingsContext'
import { TeaserItem } from './components/TeaserItem'
import { TeaserItemEdit } from './components/TeaserItemEdit'
import { updateItemById } from './helpers'

import {
  DragProperties,
  ItemDragState,
  OrderableList,
  OrderableListItem,
} from '@frontify/fondue'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Item, Settings, TeaserItemMode } from './types'

import 'tailwindcss/tailwind.css'

export const TeaserBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings, setBlockSettings] =
    useBlockSettings<Settings>(appBridge)

  const { items } = blockSettings

  const orderableListItems: OrderableListItem<Item>[] = items.map(
    (item: Item, index: number) => {
      return {
        ...item,
        key: item.id,
        alt: item.title,
        sort: index,
      }
    }
  )

  // const addNewItem = (title = ''): void => {
  //   const trimmed = title.trim()

  //   const newItem = createItem(trimmed)
  //   const updatedItems = items?.length ? [...items, newItem] : [newItem]
  //   setBlockSettings({ items: updatedItems })
  // }

  const updateItem = (idToUpdate: string, properties: Partial<Item>) => {
    const updatedItems = updateItemById(items, idToUpdate, properties)
    console.log('updatedItems', updatedItems)
    setBlockSettings({
      items: updatedItems,
    })
  }

  const sortItems = (modifiedItems: OrderableListItem<Item>[]) => {
    const modifiedArray = items.map((item, index) => {
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

    setBlockSettings({ items: modifiedArray })
  }

  const renderEditable = (
    { title, id, link, image }: OrderableListItem<Item>,
    { componentDragState }: DragProperties
  ) => {
    const content = (
      <TeaserItemEdit
        key={id}
        item={{ title, id, link, image }}
        mode={TeaserItemMode.Edit}
        onTitleModified={(title) => updateItem(id, { title })}
        onLinkModified={(value) =>
          updateItem(id, { link: { ...link, link: value } })
        }
        onOpenInNewTabModified={(value) =>
          updateItem(id, { link: { ...link, openInNewTab: value } })
        }
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

  return (
    <SettingsContext.Provider value={blockSettings}>
      {!isEditing && (
        <div className="tw-grid tw-grid-cols-2 tw-gap-2">
          {items.map(({ title, id, link, image }: Item) => {
            return <TeaserItem key={id} item={{ title, id, link, image }} />
          })}
        </div>
      )}

      {isEditing && (
        <div>
          <OrderableList
            items={orderableListItems}
            dragDisabled={!isEditing}
            renderContent={renderEditable}
            onMove={sortItems}
          />
          <TeaserItemEdit mode={TeaserItemMode.Create} />
        </div>
      )}
    </SettingsContext.Provider>
  )
}
