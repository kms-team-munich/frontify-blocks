import type { Asset } from '@frontify/app-bridge'
import {
  useAssetUpload,
  useBlockAssets,
  useFileInput,
} from '@frontify/app-bridge'
import { Button, ButtonSize } from '@frontify/fondue'
import { BlockProps } from '@frontify/guideline-blocks-settings'
import { FC, useEffect, useState } from 'react'

type ImageBlockProps = BlockProps & {
  itemId: string
}

export const ImageEdit: FC<ImageBlockProps> = ({ appBridge, itemId }) => {
  const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge)

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

  // Asset chooser demo
  const onOpenAssetChooser = () => {
    appBridge.openAssetChooser(assetChooserCallback, {
      selectedValueId: blockAssets[itemId]?.[0]?.id,
    })
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-gap-2">
        <Button size={ButtonSize.Small} onClick={onOpenAssetChooser}>
          Choose image
        </Button>
        <Button
          size={ButtonSize.Small}
          onClick={openFileDialog}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>

      {blockAssets[itemId] && (
        <div className="tw-border tw-rounded tw-border-black-20">
          <img src={blockAssets[itemId][0].previewUrl} />
        </div>
      )}
    </div>
  )
}
