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
      type: 'textarea',
      label: 'Copy',
    },
    {
      id: 'footer',
      type: 'textarea',
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
          value: 'Azure',
          label: 'Azure',
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
