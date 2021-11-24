/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { ApiBundle, ApiSettings } from '@frontify/guideline-blocks-settings';
import { numericalOrPixelRule, pxAutocomplete } from '@frontify/guideline-blocks-shared';
import { LineType, LineWidth, lineWidthMap, QuoteSize, quoteSizeMap, QuoteStyle, QuoteType } from './types';

const QUOTE_TYPE_ID = 'type';
const SIZE_CHOICE_ID = 'sizeChoice';
const SIZE_VALUE_ID = 'sizeValue';
const LINE_WIDTH_VALUE_ID = 'lineWidthValue';
const LINE_WIDTH_CHOICE_ID = 'lineWidthChoice';
const ACCENT_LINE_SWITCH_ID = 'showAccentLine';
const QUOTE_STYLE_CHOICES = [
    { value: QuoteStyle.DoubleUp, icon: IconEnum.DoubleQuotesUp, label: 'Double Up' },
    { value: QuoteStyle.DoubleDown, icon: IconEnum.DoubleQuotesDown, label: 'Double Down' },
    { value: QuoteStyle.SingleUp, icon: IconEnum.SingleQuoteUp, label: 'Single Up' },
    { value: QuoteStyle.SingleDown, icon: IconEnum.SingleQuoteDown, label: 'Single Down' },
    { value: QuoteStyle.DoubleChevronLeft, icon: IconEnum.DoubleChevronLeft, label: 'Double Chevron Left' },
    { value: QuoteStyle.DoubleChevronRight, icon: IconEnum.DoubleChevronRight, label: 'Double Chevron Right' },
    { value: QuoteStyle.SingleChevronLeft, icon: IconEnum.SingleChevronLeft, label: 'Single Chevron Left' },
    { value: QuoteStyle.SingleChevronRight, icon: IconEnum.SingleChevronRight, label: 'Single Chevron Right' },
    { value: QuoteStyle.HookBracketLeft, icon: IconEnum.HookBracketLeft, label: 'Hook Bracket Left' },
    { value: QuoteStyle.HookBracketRight, icon: IconEnum.HookBracketRight, label: 'Hook Bracket Right' },
    { value: QuoteStyle.None, icon: IconEnum.None, label: 'None' },
];

export const COLOR_DEFAULT_VALUE = { rgba: { r: 179, g: 181, b: 181, a: 1 }, name: 'Light Grey', hex: 'B3B5B5' };

const isSelected = (bundle: ApiBundle, choice: QuoteType) => bundle.getBlock(QUOTE_TYPE_ID)?.value === choice;
const showAccentLine = (bundle: ApiBundle) =>
    isSelected(bundle, QuoteType.Indentation) && bundle.getBlock(ACCENT_LINE_SWITCH_ID)?.value === true;

const Settings: ApiSettings = {
    main: [
        {
            id: QUOTE_TYPE_ID,
            type: 'dropdown',
            defaultValue: QuoteType.QuotationMarks,
            size: 'Large',
            choices: [
                {
                    value: QuoteType.QuotationMarks,
                    icon: IconEnum.Quote,
                    label: 'Quotation Marks',
                },
                {
                    value: QuoteType.Indentation,
                    icon: IconEnum.ListIndented,
                    label: 'Indentation',
                },
            ],
        },
    ],
    content: [
        {
            id: 'quoteStyleLeft',
            label: 'Left',
            type: 'dropdown',
            defaultValue: QuoteStyle.DoubleUp,
            choices: QUOTE_STYLE_CHOICES,
            show: (bundle: ApiBundle) => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: 'quoteStyleRight',
            label: 'Right',
            type: 'dropdown',
            defaultValue: QuoteStyle.DoubleUp,
            choices: QUOTE_STYLE_CHOICES,
            show: (bundle: ApiBundle) => isSelected(bundle, QuoteType.QuotationMarks),
        },
    ],
    layout: [
        {
            id: 'showAuthor',
            type: 'switch',
            label: 'Author',
            defaultValue: false,
            on: [
                {
                    id: 'authorName',
                    type: 'input',
                    placeholder: 'John Doe',
                },
            ],
            off: [],
        },
    ],
    style: [
        {
            id: 'isCustomSize',
            label: 'Size',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            onChange: (bundle: ApiBundle): void => {
                const sliderValue = bundle.getBlock(SIZE_CHOICE_ID)?.value as QuoteSize;
                const customValue = bundle.getBlock(SIZE_VALUE_ID)?.value;
                const dividerHeightKey = (Object.keys(quoteSizeMap) as Array<QuoteSize>).find(
                    (key) => quoteSizeMap[key] === customValue
                );
                if ((sliderValue && dividerHeightKey) || (sliderValue && !customValue)) {
                    bundle.setBlockValue(SIZE_VALUE_ID, quoteSizeMap[sliderValue]);
                }
            },
            on: [
                {
                    id: SIZE_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => pxAutocomplete(bundle, SIZE_VALUE_ID),
                },
            ],
            off: [
                {
                    id: SIZE_CHOICE_ID,
                    type: 'slider',
                    defaultValue: QuoteSize.SmallSize,
                    choices: [
                        {
                            label: 'S',
                            value: QuoteSize.SmallSize,
                        },
                        {
                            label: 'M',
                            value: QuoteSize.MediumSize,
                        },
                        {
                            label: 'L',
                            value: QuoteSize.LargeSize,
                        },
                    ],
                },
            ],
            show: (bundle: ApiBundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
        },
        {
            id: ACCENT_LINE_SWITCH_ID,
            type: 'switch',
            label: 'Accent line',
            defaultValue: true,
            show: (bundle: ApiBundle): boolean => isSelected(bundle, QuoteType.Indentation),
        },
        {
            id: 'lineType',
            type: 'slider',
            label: 'Type',
            info: 'Choose between a solid, dashed and dotted accent line',
            defaultValue: LineType.Solid,
            show: showAccentLine,
            choices: [
                {
                    label: 'Solid',
                    value: LineType.Solid,
                },
                {
                    label: 'Dashed',
                    value: LineType.Dashed,
                },
                {
                    label: 'Dotted',
                    value: LineType.Dotted,
                },
            ],
        },
        {
            id: 'isCustomLineWidth',
            label: 'Width',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: 'Choose between small, medium, large or custom accent line width',
            show: showAccentLine,
            onChange: (bundle: ApiBundle): void => {
                const sliderValue = bundle.getBlock(LINE_WIDTH_CHOICE_ID)?.value as LineWidth;
                const customValue = bundle.getBlock(LINE_WIDTH_VALUE_ID)?.value;
                const dividerHeightKey = (Object.keys(lineWidthMap) as Array<LineWidth>).find(
                    (key) => lineWidthMap[key] === customValue
                );
                if ((sliderValue && dividerHeightKey) || (sliderValue && !customValue)) {
                    bundle.setBlockValue(LINE_WIDTH_VALUE_ID, lineWidthMap[sliderValue]);
                }
            },
            on: [
                {
                    id: LINE_WIDTH_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => pxAutocomplete(bundle, LINE_WIDTH_VALUE_ID),
                },
            ],
            off: [
                {
                    id: LINE_WIDTH_CHOICE_ID,
                    type: 'slider',
                    defaultValue: LineWidth.SmallWidth,
                    choices: [
                        {
                            label: 'S',
                            value: LineWidth.SmallWidth,
                        },
                        {
                            label: 'M',
                            value: LineWidth.MediumWidth,
                        },
                        {
                            label: 'L',
                            value: LineWidth.LargeWidth,
                        },
                    ],
                },
            ],
        },
        {
            id: 'accentLinecolor',
            label: 'Color',
            type: 'colorInput',
            defaultValue: COLOR_DEFAULT_VALUE,
            show: showAccentLine,
        },
        {
            id: 'quotesColor',
            label: 'Color',
            type: 'colorInput',
            defaultValue: COLOR_DEFAULT_VALUE,
            show: (bundle: ApiBundle): boolean => isSelected(bundle, QuoteType.QuotationMarks),
        },
    ],
};

export default Settings;
