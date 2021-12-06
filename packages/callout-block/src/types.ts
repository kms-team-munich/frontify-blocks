/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export enum Type {
    Warning = 'warning',
    Tip = 'tip',
    Note = 'note',
    Info = 'info',
}

export const typeMap: Record<Type, string> = {
    [Type.Warning]: 'tw-bg-red-60',
    [Type.Tip]: 'tw-bg-green-60',
    [Type.Note]: 'tw-bg-violet-60',
    [Type.Info]: 'tw-bg-yellow-60',
};

export enum Width {
    FullWidth = 'fullWidth',
    HugContents = 'hugContents',
}

export const outerWidthMap: Record<Width, string> = {
    [Width.FullWidth]: 'tw-block',
    [Width.HugContents]: 'tw-flex',
};

export enum Alignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export const alignmentMap: Record<Alignment, string> = {
    [Alignment.Left]: 'tw-justify-start',
    [Alignment.Center]: 'tw-justify-center',
    [Alignment.Right]: 'tw-justify-end',
};

export enum CornerRadius {
    None = 'none',
    S = 's',
    M = 'm',
    L = 'l',
}

export const cornerRadiusMap: Record<CornerRadius, string> = {
    [CornerRadius.None]: 'tw-rounded-none',
    [CornerRadius.S]: 'tw-rounded-sm',
    [CornerRadius.M]: 'tw-rounded',
    [CornerRadius.L]: 'tw-rounded-xl',
};

export enum Padding {
    S = 's',
    M = 'm',
    L = 'l',
}

export const paddingMap: Record<Padding, string> = {
    [Padding.S]: 'tw-px-8 tw-py-4',
    [Padding.M]: 'tw-px-8 tw-py-6',
    [Padding.L]: 'tw-p-9',
};

export type BlockSettings = {
    type: Type;
    alignment: Alignment;
    iconSwitch: boolean;
    width: Width;
    customPaddingSwitch: boolean;
    customCornerRadiusSwitch: boolean;
    textValue?: string;
    icon?: number;
    padding?: Padding;
    customPadding?: string[];
    cornerRadius?: CornerRadius;
    customCornerRadius?: string[];
};

export type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

export type CalloutBlockProps = {
    appBridge: AppBridgeNative;
};