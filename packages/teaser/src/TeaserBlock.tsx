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
import { Item, Settings } from './types'

import 'tailwindcss/tailwind.css'

export const TeaserBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings, setBlockSettings] =
    useBlockSettings<Settings>(appBridge)

  const { items } = blockSettings

  const orderableListItems: OrderableListItem<Item>[] = items?.map(
    (item: Item, index: number) => {
      return {
        ...item,
        key: item.id,
        alt: item.title,
        sort: index,
      }
    }
  )

  const addNewItem = (): void => {
    const newItem = createItem()
    const updatedItems = items?.length ? [...items, newItem] : [newItem]
    setBlockSettings({ items: updatedItems })
  }

  const updateItem = (
    idToUpdate: string,
    properties: Partial<Item>
  ): Promise<void> => {
    const updatedItems = updateItemById(items, idToUpdate, properties)
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
    { title, id, link, image }: OrderableListItem<Item>,
    { componentDragState }: DragProperties
  ) => {
    const content = (
      <TeaserItemEdit
        key={id}
        item={{ title, id, link, image }}
        onTitleModified={(title) => updateItem(id, { title })}
        onLinkModified={(value) =>
          updateItem(id, { link: { ...link, link: value } })
        }
        onOpenInNewTabModified={(value) =>
          updateItem(id, { link: { ...link, openInNewTab: value } })
        }
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

  return (
    <SettingsContext.Provider value={blockSettings}>
      {!isEditing && (
        <div className="tw-grid tw-grid-cols-2 tw-gap-2">
          {items?.map((item: Item) => {
            return <TeaserItem key={item.id} item={item} />
          })}
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
