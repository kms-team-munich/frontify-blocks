/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChoicesType } from './choices';

export type SliderBlock = {
    type: 'slider';
    helperText?: string;
} & ChoicesType;