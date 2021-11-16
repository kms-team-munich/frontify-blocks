import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import '@frontify/arcade/style';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { mapRgbaToString } from '../../shared/src';
import { LineType, LineWidth, Props, QuoteSize, QuoteStyle, QuoteType, Settings } from './types';
import { quoteIconMap, quoteSizeMap } from './utilities';

type ContentWithAuthorProps = {
    showAuthor: boolean;
    authorName: string;
};

const ContentWithAuthor: FC<ContentWithAuthorProps> = ({ showAuthor, authorName, children }) => (
    <div className="tw-flex-1 tw-w-full">
        {children}
        {showAuthor && authorName && <p className="tw-text-right">{`- ${authorName}`}</p>}
    </div>
);

const lineWidthMap: Record<LineWidth, string> = {
    [LineWidth.SmallWidth]: '2px',
    [LineWidth.MediumWidth]: '4px',
    [LineWidth.LargeWidth]: '8px',
};

const QuoteBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();

    const {
        showAuthor = false,
        authorName = '',
        type = QuoteType.QuotationMarks,
        quoteStyleLeft = QuoteStyle.DoubleUp,
        quoteStyleRight = QuoteStyle.DoubleDown,
        isCustomSize = false,
        sizeValue = '',
        sizeChoice = QuoteSize.SmallSize,
        showAccentLine = true,
        lineType = LineType.Solid,
        isCustomLineWidth = false,
        lineWidthValue = '',
        lineWidthChoice = LineWidth.SmallWidth,
        accentLinecolor = { hex: '' },
        quotesColor = { hex: '' },
        content = '',
    } = blockSettings;

    const placeholder = 'Add your quote text here';
    const size = isCustomSize ? sizeValue : quoteSizeMap[sizeChoice];
    const quotesRgba = quotesColor.rgba ? mapRgbaToString(quotesColor.rgba) : quotesColor.hex;
    const borderRgba = accentLinecolor.rgba ? mapRgbaToString(accentLinecolor.rgba) : accentLinecolor.hex;
    const borderStyles = showAccentLine
        ? {
              borderLeftStyle: lineType,
              borderLeftWidth: isCustomLineWidth ? lineWidthValue : lineWidthMap[lineWidthChoice],
              borderLeftColor: borderRgba,
          }
        : {};

    const onChangeContent = (value: string) => setBlockSettings({ ...blockSettings, content: value });

    return (
        <>
            {type === QuoteType.QuotationMarks && (
                <div className="tw-flex tw-justify-between tw-gap-x-7">
                    {quoteIconMap(size, quotesRgba)[quoteStyleLeft]}
                    <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                        <RichTextEditor
                            placeholder={placeholder}
                            value={content}
                            onTextChange={onChangeContent}
                            readonly={!isEditing}
                        />
                    </ContentWithAuthor>
                    {quoteIconMap(size, quotesRgba)[quoteStyleRight]}
                </div>
            )}

            {type === QuoteType.Indentation && (
                <ContentWithAuthor showAuthor={showAuthor} authorName={authorName}>
                    <div style={borderStyles} className={showAccentLine ? 'tw-pl-7' : 'tw-ml-7'}>
                        <RichTextEditor
                            placeholder={placeholder}
                            value={content}
                            onTextChange={onChangeContent}
                            readonly={!isEditing}
                        />
                    </div>
                </ContentWithAuthor>
            )}
        </>
    );
};

export default QuoteBlock;
