/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useRef, useState } from 'react';
import { Tooltip, TooltipProps, TooltipArrow, IconReject, IconSize } from '@frontify/arcade';
import { mergeProps } from '@react-aria/utils';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { usePopper } from 'react-popper';

type RemoveButtonProps = {
    onClick: () => void;
};

const TOOLTIP_DISTANCE = 15;
const TOOLTIP_SKIDDING = 0;
const TOOLTIP_PADDING = 15;

export const RemoveButton: FC<RemoveButtonProps> = ({ onClick }) => {
    const tooltipElement = useRef<HTMLDivElement | null>(null);
    const [tooltipArrowElement, setTooltipArrowElement] = useState<HTMLElement | null>(null);
    const tooltipTriggerElement = useRef<HTMLButtonElement | null>(null);
    const state = useTooltipTriggerState();
    const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, tooltipTriggerElement);
    const { isOpen } = state;

    const { styles, attributes } = usePopper(tooltipTriggerElement.current, tooltipElement.current, {
        placement: 'auto',
        modifiers: [
            { name: 'offset', options: { offset: [TOOLTIP_SKIDDING, TOOLTIP_DISTANCE] } },
            { name: 'arrow', options: { element: tooltipArrowElement, padding: TOOLTIP_PADDING } },
        ],
    });

    const { buttonProps } = useButton({
        onPress: () => onClick(),
    });

    const { hoverProps } = useHover({
        onHoverStart: () => state.open(),
        onHoverEnd: () => state.close(),
    });

    return (
        <div className="tw-absolute tw-top-4 tw-right-4 tw-w-9 tw-h-9" {...hoverProps}>
            <button
                ref={tooltipTriggerElement}
                className="tw-flex tw-w-9 tw-h-9 tw-items-center tw-justify-center tw-bg-black-20 hover:tw-bg-black-30 tw-transition-colors tw-rounded tw-text-black"
                {...mergeProps(triggerProps, buttonProps)}
            >
                <IconReject size={IconSize.Size20} />
            </button>
            {isOpen && (
                <Tooltip
                    content="Remove link"
                    popperAttributes={attributes.popper}
                    ref={tooltipElement}
                    style={styles.popper}
                    tooltipAriaProps={tooltipProps}
                >
                    <TooltipArrow
                        ref={setTooltipArrowElement}
                        style={styles.arrow}
                        placement={attributes.popper?.['data-popper-placement']}
                    />
                </Tooltip>
            )}
        </div>
    );
};