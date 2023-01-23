import { TeaserItemEdit } from '../TeaserItemEdit'
import { Item, Settings } from '../../types'
import { createItem, updateItemById } from '../../helpers'
import { SettingsContext } from '../../SettingsContext'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'
import {
  BoldPlugin,
  Button,
  ButtonSize,
  DragProperties,
  InitPlugin,
  ItalicPlugin,
  ItemDragState,
  LinkPlugin,
  OrderableList,
  OrderableListItem,
  PluginComposer,
  RichTextEditor,
  TextInput,
} from '@frontify/fondue'
import { BlockProps } from '@frontify/guideline-blocks-settings'
import { FC, useState } from 'react'

const richTextPlugins = new PluginComposer()

richTextPlugins
  .setPlugin([new InitPlugin()])
  .setPlugin([new LinkPlugin()])
  .setPlugin([new ItalicPlugin(), new BoldPlugin()])

export const EditView: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)

  const [blockSettings, setBlockSettings] =
    useBlockSettings<Settings>(appBridge)

  const { items, title, copy, footer } = blockSettings

  // Title
  const [mappedTitle, setMappedTitle] = useState(title)

  const onTitleChange = (newValue: string) => {
    setMappedTitle(newValue)
    setBlockSettings({
      title: newValue,
    })
  }
  const onTitleBlur = () => {
    setBlockSettings({
      title: mappedTitle,
    })
  }

  // Copy
  const [mappedCopy, setMappedCopy] = useState(copy)

  const onCopyChange = (newValue: string) => {
    setMappedCopy(newValue)
    setBlockSettings({
      copy: newValue,
    })
  }
  const onCopyBlur = () => {
    setBlockSettings({
      copy: mappedCopy,
    })
  }

  // Footer
  const [mappedFooter, setMappedFooter] = useState(footer)

  const onFooterChange = (newValue: string) => {
    setMappedFooter(newValue)
    setBlockSettings({
      footer: newValue,
    })
  }
  const onFooterBlur = () => {
    setBlockSettings({
      footer: mappedFooter,
    })
  }

  // List
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

  return (
    <div className="tw-flex tw-flex-col tw-gap-5">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <TextInput
          value={mappedTitle}
          onChange={onTitleChange}
          onBlur={onTitleBlur}
        />
        <div className="tw-border tw-px-3 tw-py-1 tw-min-h-[2.25rem] tw-rounded tw-border focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20">
          <RichTextEditor
            value={mappedCopy}
            onTextChange={onCopyChange}
            onBlur={onCopyBlur}
            plugins={richTextPlugins}
          />
        </div>
      </div>
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
      <div className="tw-border tw-px-3 tw-py-1 tw-min-h-[2.25rem] tw-rounded tw-border focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20">
        <RichTextEditor
          value={mappedFooter}
          onTextChange={onFooterChange}
          onBlur={onFooterBlur}
          plugins={richTextPlugins}
        />
      </div>
    </div>
  )
}
