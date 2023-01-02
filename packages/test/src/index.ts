import { defineBlock } from '@frontify/guideline-blocks-settings'
import { TestBlock } from './TestBlock'
import { settings } from './settings'

export default defineBlock({
  block: TestBlock,
  settings,
})
