/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import { CalloutBlock } from './CalloutBlock';
import { Alignment, Padding, Type, Width } from './types';

const CalloutBlockSelector = '[data-test-id="callout-block"]';
const CalloutWrapper = '[data-test-id="callout-wrapper"]';
const CalloutIcon = '[data-test-id="callout-icon"]';

describe('Callout Block', () => {
    it('renders a callout block', () => {
        const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {});

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutBlockSelector).should('exist');
    });

    it('renders a callout block with the correct background color', () => {
        const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {
            blockSettings: {
                type: Type.Note,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutWrapper).should('have.class', 'tw-bg-violet-60');
    });

    it('renders a callout block with the correct layout settings', () => {
        const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {
            blockSettings: {
                alignment: Alignment.Right,
                paddingChoice: Padding.L,
                width: Width.HugContents,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutBlockSelector).should('have.class', 'tw-flex');
        cy.get(CalloutBlockSelector).should('have.class', 'tw-justify-end');
        cy.get(CalloutWrapper).should('have.class', 'tw-p-9');
    });

    it('renders a callout block with the correct border radius style', () => {
        const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {
            blockSettings: {
                hasExtendedCustomRadius: true,
                extendedRadiusTopLeft: '10px',
                extendedRadiusTopRight: '20px',
                extendedRadiusBottomLeft: '40px',
                extendedRadiusBottomRight: '30px',
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutWrapper).should('have.css', 'border-radius').and('eq', '10px 20px 30px 40px');
    });

    it('renders a callout block with an icon', () => {
        const [CalloutBlockWithStubs] = withAppBridgeStubs(CalloutBlock, {
            blockSettings: {
                iconSwitch: true,
                icon: 123,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutIcon).should('exist');
    });
});