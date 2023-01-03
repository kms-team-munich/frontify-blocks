import { FC } from 'react'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'

import { SettingsContext } from './SettingsContext'
import { TeaserItem } from './components/TeaserItem'
import { createItem, updateItemById } from './helpers'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Item, Settings, TeaserItemMode } from './types'

import 'tailwindcss/tailwind.css'

export const TeaserBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings, setBlockSettings] =
    useBlockSettings<Settings>(appBridge)

  const { items } = blockSettings

  const addNewItem = (title: string): void => {
    const trimmed = title.trim()
    if (!trimmed) {
      return
    }
    const newItem = createItem(trimmed)
    const updatedItems = items?.length ? [...items, newItem] : [newItem]
    setBlockSettings({ items: updatedItems })
  }

  const updateItem = (idToUpdate: string, properties: Partial<Item>) => {
    const updatedItems = updateItemById(items, idToUpdate, properties)
    console.log('updatedItems', updatedItems)
    setBlockSettings({
      items: updatedItems,
    })
  }

  const renderTeaserItem = ({ title, id, link }: Item) => {
    const content = (
      <TeaserItem
        key={id}
        item={{ title, id, link }}
        mode={isEditing ? TeaserItemMode.Edit : TeaserItemMode.View}
        onTitleModified={(title) => updateItem(id, { title })}
        onLinkModified={(value) =>
          updateItem(id, { link: { ...link, link: value } })
        }
        onOpenInNewTabModified={(value) =>
          updateItem(id, { link: { ...link, openInNewTab: value } })
        }
      />
    )

    return content
  }

  return (
    <SettingsContext.Provider value={blockSettings}>
      <div className="tw-grid tw-grid-cols-2 tw-gap-2">
        {items.map((item) => {
          return renderTeaserItem(item)
        })}
        {isEditing && (
          <TeaserItem
            mode={TeaserItemMode.Create}
            onTitleModified={addNewItem}
          />
        )}
      </div>
    </SettingsContext.Provider>
  )
}
