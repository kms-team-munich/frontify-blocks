/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { ColorsBlock } from './ColorsBlock';
import { ColorsBlockType } from './types';

const ColorBlockSelector = '[data-test-id="color-block"]';
const ColorSpaceSelector = '[data-test-id="color-space"]';

const DEFAULT_COLOR_SPACES = ['hex', 'rgb'];

const ALL_COLOR_SPACES = [
    'hex',
    'rgb',
    'cmyk',
    'cmykCoated',
    'cmykUncoated',
    'cmykNewspaper',
    'pantone',
    'pantoneCoated',
    'pantoneUncoated',
    'pantoneCp',
    'pantoneTextile',
    'pantonePlastics',
    'ral',
    'variable',
    'lab',
    'ncs',
    'hks',
    'threeM',
    'oracal',
];

describe('ColorBlock component', () => {
    it('renders a color block list view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.List,
                colorspaces: DEFAULT_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders a color block drops view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.Drops,
                colorspaces: DEFAULT_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders a color block cards view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.Cards,
                colorspaces: DEFAULT_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorBlockSelector).should('exist');
    });

    it('renders color block with all colorspaces in list view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.List,
                colorspaces: ALL_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLOR_SPACES.length * 3);
    });

    it('renders color block with all colorspaces in drops view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.Drops,
                colorspaces: ALL_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLOR_SPACES.length * 3);
    });

    it('renders color block with all colorspaces in cards view', () => {
        const [ColorBlockWithStubs] = withAppBridgeBlockStubs(ColorsBlock, {
            blockSettings: {
                view: ColorsBlockType.Cards,
                colorspaces: ALL_COLOR_SPACES,
            },
        });

        mount(<ColorBlockWithStubs />);
        cy.get(ColorSpaceSelector).should('have.length', ALL_COLOR_SPACES.length * 3);
    });
});