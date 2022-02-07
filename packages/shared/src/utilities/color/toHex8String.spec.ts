/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String } from './toHex8String';

describe('toHex8String', () => {
    const data = [
        { color: { r: 255, g: 255, b: 255 }, expected: '#ffffffff' },
        { color: { r: 255, g: 221, b: 255, a: 1 }, expected: '#ffddffff' },
        { color: { r: 255, g: 255, b: 15, a: 0 }, expected: '#ffff0f00' },
        { color: { r: 238, g: 35, b: 84, a: 0.4 }, expected: '#ee235466' },
    ];

    it.each(data)('validates against expected values', ({ color, expected }) => {
        expect(toHex8String(color)).toBe(expected);
    });
});