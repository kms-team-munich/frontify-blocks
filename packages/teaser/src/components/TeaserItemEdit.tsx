import { TeaserItemEditProps } from '../types'
import { AssetEdit } from './AssetEdit'
import { useBlockAssets } from '@frontify/app-bridge'
import {
  BoldPlugin,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Dropdown,
  IconTrashBin,
  InitPlugin,
  MenuItemContentSize,
  MultiInput,
  MultiInputLayout,
  PluginComposer,
  RichTextEditor,
  TextInput,
} from '@frontify/fondue'

import { FC, useState } from 'react'

const richTextPlugins = new PluginComposer()

richTextPlugins.setPlugin([new InitPlugin()]).setPlugin([new BoldPlugin()])

export const TeaserItemEdit: FC<TeaserItemEditProps> = ({
  item,
  onTitleModified,
  onLinkModified,
  onBlockTypeModified,
  onRemoveItem,
  appBridge,
}) => {
  const [target] = useState(item?.target)
  const [link, setLink] = useState(target?.link)
  const [title, setTitle] = useState(item?.title)
  const [blockType, setBlockType] = useState(item?.blockType)
  const { blockAssets, deleteAssetIdsFromKey } = useBlockAssets(appBridge)

  const onTitleBlur = () => {
    if (!title) return
    if (onTitleModified) onTitleModified(title)
  }

  const onTitleChange = (newValue: string) => {
    setTitle(newValue)
    if (onTitleModified) onTitleModified(newValue)
  }

  const onLinkChange = (newValue: string) => {
    setLink(newValue)
    if (onLinkModified) onLinkModified(newValue)
  }

  const onLinkBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    if (onLinkModified) onLinkModified(value)
  }

  const onBlockTypeChange = (newValue: string | number | undefined) => {
    setBlockType(newValue)
    if (onBlockTypeModified) onBlockTypeModified(newValue)
  }

  const deleteAssets = (id: string) => {
    const assets = blockAssets[id]?.map((asset) => asset.id)
    if (assets) {
      deleteAssetIdsFromKey(id, assets)
    }
  }

  const onDelete = () => {
    if (item) {
      onRemoveItem(item.id)
      deleteAssets(`${item.id}-img`)
      deleteAssets(`${item.id}-icon`)
    }
  }

  const imgAssetChooserOptions = {
    multiSelection: false,
    extensions: ['jpg', 'png', 'svg'],
  }

  const iconAssetChooserOptions = {
    multiSelection: false,
    extensions: ['svg'],
  }

  const downloadAssetChooserOptions = {
    multiSelection: false,
    extensions: ['pdf', 'zip'],
  }

  const blockTypeMenuBlocks = [
    {
      id: 'blockType',
      ariaLabel: 'Block type',
      menuItems: [
        {
          id: 'link',
          title: 'Link',
          size: MenuItemContentSize.Small,
        },
        {
          id: 'download',
          title: 'Download',
          size: MenuItemContentSize.Small,
        },
      ],
    },
  ]

  return (
    <div className="tw-p-5 hover:tw-cursor-pointer tw-rounded tw-border hover:tw-border-black-90 tw-border-black-20 tw-flex tw-flex-col tw-gap-2">
      <Dropdown
        menuBlocks={blockTypeMenuBlocks}
        onChange={onBlockTypeChange}
        activeItemId={blockType}
      />
      <div className="tw-border tw-px-3 tw-py-1 tw-min-h-[2.25rem] tw-rounded tw-border focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20">
        <RichTextEditor
          value={title}
          onTextChange={onTitleChange}
          onBlur={onTitleBlur}
          plugins={richTextPlugins}
        />
      </div>

      <MultiInput layout={MultiInputLayout.Columns}>
        <AssetEdit
          appBridge={appBridge}
          itemId={`${item?.id}-icon` || 'default-img'}
          assetChooserOptions={iconAssetChooserOptions}
          buttonLabel="Choose icon"
        />
        <AssetEdit
          appBridge={appBridge}
          itemId={`${item?.id}-img` || 'default-img'}
          assetChooserOptions={imgAssetChooserOptions}
          buttonLabel="Choose background"
        />
        <AssetEdit
          appBridge={appBridge}
          disabled={blockType !== 'download'}
          itemId={`${item?.id}-download` || 'default-download'}
          assetChooserOptions={downloadAssetChooserOptions}
          buttonLabel="Choose file"
        />
        <TextInput
          placeholder="Link"
          value={link}
          disabled={blockType !== 'link'}
          onChange={onLinkChange}
          onBlur={onLinkBlur}
        />
      </MultiInput>
      <div className="tw-mt-auto tw-self-end">
        <Button
          hideLabel
          hugWidth
          icon={<IconTrashBin />}
          onClick={onDelete}
          size={ButtonSize.Medium}
          emphasis={ButtonEmphasis.Default}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
