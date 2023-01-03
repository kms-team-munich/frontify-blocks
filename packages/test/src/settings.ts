import { defineSettings } from '@frontify/guideline-blocks-settings'

export const settings = defineSettings({
  main: [
    {
      id: 'target',
      type: 'linkChooser',
    },
    {
      id: 'title',
      type: 'input',
      label: 'Title overwrite',
    },
  ],
})
