import type { Asset } from '@frontify/app-bridge'
import {
  useAssetUpload,
  useBlockAssets,
  useFileInput,
} from '@frontify/app-bridge'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  IconTrashBin,
} from '@frontify/fondue'
import { FC, useEffect, useState } from 'react'
import { AssetEditProps } from '../types'

export const AssetEdit: FC<AssetEditProps> = ({
  appBridge,
  itemId,
  assetChooserOptions,
  disabled,
  buttonLabel = 'Choose image',
}) => {
  const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } =
    useBlockAssets(appBridge)

  const [loading, setLoading] = useState(false)
  const [openFileDialog, { selectedFiles }] = useFileInput({})
  const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
    onUploadProgress: () => !loading && setLoading(true),
  })

  useEffect(() => {
    if (selectedFiles) {
      setLoading(true)
      uploadFile(selectedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles])

  useEffect(() => {
    if (doneAll) {
      ;(async (uploadResults) => {
        const assetsId = uploadResults.map((uploadResult) => uploadResult.id)
        await updateAssetIdsFromKey(itemId, assetsId)
        setLoading(false)
      })(uploadResults)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneAll, uploadResults])

  const assetChooserCallback = (result: Asset[]) => {
    const resultId = result[0].id
    updateAssetIdsFromKey(itemId, [resultId])
    appBridge.closeAssetChooser()
  }

  // Asset chooser
  const onOpenAssetChooser = () => {
    appBridge.openAssetChooser(assetChooserCallback, {
      ...assetChooserOptions,
      selectedValueId: blockAssets[itemId]?.[0]?.id,
    })
  }

  const deleteAssets = (id: string) => {
    const assets = blockAssets[id]?.map((asset) => asset.id)
    if (assets) {
      deleteAssetIdsFromKey(id, assets)
    }
  }

  const asset = blockAssets?.[itemId]?.[0]

  const containerClasses = [
    'tw-relative tw-w-full tw-p-1 tw-h-full tw-max-h-16 tw-flex tw-justify-end tw-items-end tw-gap-4 tw-border tw-rounded tw-border-black-20',
    disabled && 'tw-user-select-none tw-border-black-5 tw-bg-black-5',
  ].join(' ')

  return (
    <div className={containerClasses}>
      {asset && (
        <div
          className={[
            'tw-w-full tw-h-full tw-object-contain',
            disabled && 'tw-opacity-25',
          ].join(' ')}
        >
          <img src={asset.previewUrl} className="tw-h-full tw-w-auto" />
        </div>
      )}
      <div className="tw-flex-shrink-0 tw-flex tw-gap-2">
        <Button
          size={ButtonSize.Small}
          onClick={onOpenAssetChooser}
          disabled={disabled}
          emphasis={ButtonEmphasis.Default}
        >
          {buttonLabel}
        </Button>
        <Button
          size={ButtonSize.Small}
          onClick={openFileDialog}
          disabled={loading || disabled}
          emphasis={ButtonEmphasis.Default}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
        <Button
          hideLabel
          hugWidth
          icon={<IconTrashBin />}
          onClick={() => deleteAssets(itemId)}
          size={ButtonSize.Small}
          disabled={disabled}
          emphasis={ButtonEmphasis.Default}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
