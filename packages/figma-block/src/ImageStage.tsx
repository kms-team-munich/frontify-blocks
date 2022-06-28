/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './components';
import { useImageStage } from './useImageStage';
import { DEFAULT_HEIGHT } from './settings';
import { ImageStageProps } from './types';

export const ImageStage = ({
    title,
    url,
    isContainerVector = true,
    height = DEFAULT_HEIGHT,
    hasBorder = false,
    hasBackground = false,
}: ImageStageProps) => {
    const { stageRef, containerRef, imageRef, isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, setIsImageLoaded } =
        useImageStage({ height, isContainerVector });

    return (
        <div
            className={joinClassNames([
                'tw-border',
                isFullScreen && 'tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200]',
                hasBackground ? 'tw-bg-black-5' : 'tw-bg-white',
                hasBorder ? 'tw-border-black-40' : 'tw-border-transparent',
            ])}
        >
            <div className="tw-w-full tw-relative tw-overflow-hidden">
                <div ref={stageRef} className="tw-relative tw-overflow-hidden" style={{ height }}>
                    <div className="tw-absolute" ref={containerRef}>
                        <img
                            ref={imageRef}
                            alt={title}
                            src={url}
                            className="tw-relative"
                            width="100%"
                            height="100%"
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>
                </div>
                {isContainerVector && (
                    <>
                        <DrawFullScreenActionButton
                            isFullScreen={isFullScreen}
                            onClick={() => setIsFullScreen(!isFullScreen)}
                        />
                        <DrawZoomInOutButtons onClickZoomIn={onZoomIn} onClickZoomOut={onZoomOut} />
                    </>
                )}
            </div>
        </div>
    );
};