/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC } from 'react';

export const ExampleBlock: FC = () => {
    return (
        <div data-test-id="example-block">
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};