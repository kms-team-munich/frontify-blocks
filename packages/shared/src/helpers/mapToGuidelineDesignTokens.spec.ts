/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { mapToGuidelineDesignTokens } from './mapToGuidelineDesignTokens';

const mockedDesignTokens = {
    heading1: {
        family: 'Arial',
        weight: '700',
        size: '40px',
        line_height: '44px',
        margin_top: '4px',
        margin_bottom: '4px',
        uppercase: '1',
    },
    heading2: {
        family: 'Arial',
        weight: '500',
        size: '30px',
        line_height: '34px',
        margin_top: '4px',
        margin_bottom: '4px',
        uppercase: '1',
    },
    heading3: {
        family: 'Arial',
        weight: '400',
        size: '28px',
        line_height: '32px',
        margin_top: '2px',
        margin_bottom: '2px',
        uppercase: '1',
    },
    heading4: {
        family: 'Arial',
        weight: '300',
        size: '24px',
        line_height: '28px',
        margin_top: '2px',
        margin_bottom: '2px',
        uppercase: '1',
        underline: '1',
    },
    custom1: {
        family: 'Helvetica Neue',
        size: '24px',
        letterspacing: '2px',
    },
    custom2: {
        family: 'Helvetica Neue',
        size: '28px',
        letterspacing: '2px',
        italic: '1',
        underline: '1',
    },
    custom3: {
        family: 'Roboto',
    },
    body: {
        size: '14px',
        color: '#333',
    },
    link: {
        underline: '1',
    },
    quote: {
        italic: '1',
    },
};

const expectedTransformedDesignTokens = {
    heading1: {
        fontFamily: 'Arial',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '44px',
        marginTop: '4px',
        marginBottom: '4px',
        textTransform: 'uppercase',
    },
    heading2: {
        fontFamily: 'Arial',
        fontWeight: '500',
        fontSize: '30px',
        lineHeight: '34px',
        marginTop: '4px',
        marginBottom: '4px',
        textTransform: 'uppercase',
    },
    heading3: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: '28px',
        lineHeight: '32px',
        marginTop: '2px',
        marginBottom: '2px',
        textTransform: 'uppercase',
    },
    heading4: {
        fontFamily: 'Arial',
        fontWeight: '300',
        fontSize: '24px',
        lineHeight: '28px',
        marginTop: '2px',
        marginBottom: '2px',
        textTransform: 'uppercase',
        textDecoration: 'underline',
    },
    custom1: {
        fontFamily: 'Helvetica Neue',
        fontSize: '24px',
        letterSpacing: '2px',
    },
    custom2: {
        fontFamily: 'Helvetica Neue',
        fontSize: '28px',
        letterSpacing: '2px',
        fontStyle: 'italic',
        textDecoration: 'underline',
    },
    custom3: {
        fontFamily: 'Roboto',
    },
    body: {
        fontSize: '14px',
        color: '#333',
    },
    link: {
        textDecoration: 'underline',
    },
    quote: {
        fontStyle: 'italic',
    },
};

/**
 * @vitest-environment happy-dom
 */
describe('mapToGuidelineDesignTokens', () => {
    it('should transform design tokens', () => {
        expect(mapToGuidelineDesignTokens(mockedDesignTokens)).toMatchObject(expectedTransformedDesignTokens);
    });

    it('should transform uppercase to textTransform', () => {
        const result = mapToGuidelineDesignTokens({ body: { uppercase: '1' } });
        expect(result).toMatchObject({ body: { textTransform: 'uppercase' } });
    });

    it('should transform italic to fontStyle', () => {
        const result = mapToGuidelineDesignTokens({ body: { italic: '1' } });
        expect(result).toMatchObject({ body: { fontStyle: 'italic' } });
    });

    it('should transform underline to textDecoration', () => {
        const result = mapToGuidelineDesignTokens({ body: { underline: '1' } });
        expect(result).toMatchObject({ body: { textDecoration: 'underline' } });
    });

    it('should transform color value', () => {
        const result = mapToGuidelineDesignTokens({ body: { color: '#fff' } });
        expect(result).toMatchObject({ body: { color: '#fff' } });
    });
});