import { BlockSettings } from '@frontify/guideline-blocks-settings'

export const settings: BlockSettings = {
  main: [
    {
      id: 'linkValue',
      type: 'linkChooser',
    },
    {
      id: 'titleValue',
      type: 'input',
      label: 'Title overwrite',
    },
  ],
  basics: [],
  layout: [],
  style: [],
  security: [],
}
