/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { NoteHeaderProps } from '../types';

dayjs.extend(localizedFormat).locale(navigator.language || navigator.userLanguage);

export const NoteHeader: FC<NoteHeaderProps> = ({
    name,
    avatar,
    hasAvatarName,
    hasDateEdited,
    dateEdited,
    useLightText,
}) => (
    <div className={`tw-flex tw-items-center tw-space-x-4 ${hasAvatarName || hasDateEdited ? 'tw-mb-4' : ''}`}>
        {hasAvatarName && avatar && <img src={avatar} width="32" height="32" className="tw-rounded-full" />}
        <div className="tw-flex tw-flex-col tw-text-s">
            {hasAvatarName && <span className={useLightText ? 'tw-text-white' : 'tw-text-black'}>{name}</span>}
            {hasDateEdited && dateEdited && (
                <span className={useLightText ? 'tw-text-white tw-opacity-60' : 'tw-text-black-60'}>
                    Last edited on {dayjs(dateEdited).format('L, LT')}
                </span>
            )}
        </div>
    </div>
);