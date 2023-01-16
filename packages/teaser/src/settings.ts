import { defineSettings } from '@frontify/guideline-blocks-settings'

export const settings = defineSettings({
  main: [
    {
      id: 'title',
      type: 'input',
      label: 'Title',
    },
    {
      id: 'copy',
      type: 'input',
      label: 'Copy',
    },
    {
      id: 'footer',
      type: 'input',
      label: 'Footer',
    },
  ],
  style: [
    {
      id: 'background',
      label: 'Background(s)',
      type: 'dropdown',
      defaultValue: 'Light',
      choices: [
        {
          value: 'Light',
          label: 'Light',
        },
        {
          value: 'Dark',
          label: 'Dark',
        },
        {
          value: 'Highlight',
          label: 'Highlight',
        },
      ],
    },
    {
      id: 'backgroundGlobal',
      label: 'Globaler Background',
      type: 'switch',
    },
  ],
})
