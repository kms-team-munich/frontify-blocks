/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/arcade';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.Snippet,
                    label: 'Custom Block',
                },
            ],
        },
        {
            id: 'images',
            type: 'assetInput',
        },
    ],
};

export default settings;