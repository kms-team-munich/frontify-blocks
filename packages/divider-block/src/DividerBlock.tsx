/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import {
    ALIGNMENT_DEFAULT_VALUE,
    COLOR_DEFAULT_RGBA_VALUE,
    HEIGHT_DEFAULT_VALUE,
    IS_LINE_DEFAULT_VALUE,
    STYLE_DEFAULT_VALUE,
    THICKNESS_DEFAULT_VALUE,
    WIDTH_DEFAULT_VALUE,
} from './settings';
import css from './styles.module.css';
import {
    dividerAlignmentClasses,
    dividerHeightValues,
    DividerStyle,
    dividerStyleClasses,
    dividerThicknessValues,
    Props,
    Settings,
} from './types';

export const DividerBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        isLine = IS_LINE_DEFAULT_VALUE,
        alignment = ALIGNMENT_DEFAULT_VALUE,
        style = STYLE_DEFAULT_VALUE,
        color = COLOR_DEFAULT_RGBA_VALUE,
        isWidthCustom = false,
        widthCustom = '',
        widthSimple = WIDTH_DEFAULT_VALUE,
        isHeightCustom = false,
        heightCustom = '',
        heightSimple = HEIGHT_DEFAULT_VALUE,
        isThicknessCustom = false,
        thicknessCustom = '',
        thicknessSimple = THICKNESS_DEFAULT_VALUE,
    } = blockSettings;

    return (
        <div
            data-test-id="divider-block"
            className={joinClassNames(['tw-flex', css.dividerBlock, dividerAlignmentClasses[alignment]])}
        >
            <div
                data-test-id="divider-wrapper"
                className="tw-flex tw-items-center tw-transition-all"
                style={{
                    width: isWidthCustom ? widthCustom : widthSimple,
                    height: isHeightCustom ? heightCustom : dividerHeightValues[heightSimple],
                }}
            >
                <hr
                    data-test-id="divider-line"
                    className={joinClassNames([
                        'tw-border-t tw-m-0 tw-w-full',
                        dividerStyleClasses[isLine === DividerStyle.Solid ? style : DividerStyle.NoLine],
                    ])}
                    style={{
                        borderTopWidth: isThicknessCustom ? thicknessCustom : dividerThicknessValues[thicknessSimple],
                        borderTopColor: color ? toRgbaString(color) : toRgbaString(COLOR_DEFAULT_RGBA_VALUE),
                    }}
                />
            </div>
        </div>
    );
};
