/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/arcade';
import tinycolor from 'tinycolor2';

/**
 * Maps color object of rgba values to rgba string.
 *
 * @param {Object} Color object
 * @returns {String} To be used as css value.
 */

export const toRgbaString = (color: Color): string => tinycolor(color).toRgbString();