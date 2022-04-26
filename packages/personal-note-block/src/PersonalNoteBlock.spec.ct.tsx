/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { BorderStyle, withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import PersonalNoteBlock from '.';

const PersonalNoteBlockSelector = '[data-test-id="personal-note-block"]';
const PersonalNoteHeader = '[data-test-id="personal-note-header"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';

const EXAMPLE_COLOR = {
    r: 22,
    g: 181,
    b: 181,
    a: 1,
    name: 'Java',
};

const EXAMPLE_COLOR_DARK = {
    r: 46,
    g: 95,
    b: 159,
    a: 1,
    name: 'St Tropaz',
};

describe('Personal Note Block', () => {
    it('renders a personal note block', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {});

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(PersonalNoteBlockSelector).should('exist');
    });

    it('write content to personal note block', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, { editorState: true });

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(RichTextEditor).find('[contenteditable=true]').type('Hello world').blur();
        cy.get(RichTextEditor).find('[contenteditable=true]').contains('Hello world');
    });

    it('renders personal note block without header', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {
            blockSettings: {
                hasAvatarName: false,
                hasDateEdited: false,
            },
        });

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(PersonalNoteHeader).should('not.exist');
    });

    it('renders personal note block with dark background and light text color', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {
            blockSettings: {
                hasBackground: true,
                backgroundColor: EXAMPLE_COLOR_DARK,
            },
        });

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(PersonalNoteBlockSelector).should('have.css', 'background-color', 'rgb(46, 95, 159)');
        cy.get(PersonalNoteBlockSelector).should('have.class', 'tw-text-white');
    });

    it('renders personal note block with correct styling', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {
            blockSettings: {
                hasRadius: true,
                radiusValue: '5px',
                borderStyle: BorderStyle.Dashed,
                borderWidth: '2px',
                borderColor: EXAMPLE_COLOR,
            },
        });

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(PersonalNoteBlockSelector).should('have.css', 'border-style', 'dashed');
        cy.get(PersonalNoteBlockSelector).should('have.css', 'border-width', '2px');
        cy.get(PersonalNoteBlockSelector).should('have.css', 'border-color', 'rgb(22, 181, 181)');
        cy.get(PersonalNoteBlockSelector).should('have.css', 'border-radius', '5px');
    });

    it('does not render personal note block if permissions are set to editors only', () => {
        const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {
            editorState: false,
            blockSettings: { visibility: 'Editors' },
        });

        mount(<PersonalNoteBlockWithStubs />);
        cy.get(PersonalNoteBlockSelector).should('not.exist');
    });
});