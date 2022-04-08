/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { Padding, paddingStyleMap, toRgbaString, withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import { ChecklistBlock } from './ChecklistBlock';
import { createItem } from './helpers';
import {
    ChecklistContent,
    ChecklistDecoration,
    ChecklistItemMode,
    ProgressBarType,
    Settings,
    StrikethroughStyleType,
    StrikethroughType,
} from './types';
import { randomInteger } from './utilities';

const CHECKLIST_BLOCK_SELECTOR = '[data-test-id="checklist-block"]';
const CHECKLIST_ITEM = '[data-test-id="checklist-item"]';
const COMPLETED_VISIBILITY_BUTTON = '[data-test-id="toggle-completed-visibility"]';
const CHECKLIST_ITEM_CREATOR = `[data-test-id="checklist-item"][data-mode=${ChecklistItemMode.Create}]`;
const CHECKLIST_CONTAINER = '[data-test-id="checklist-container"]';
const TEXT_EDITOR = '[data-test-id="text-editor"]';
const CONTROL_BUTTONS = '[data-test-id="control-buttons"]';
const PROGRESS_BAR = '[data-test-id="progress-bar"]';
const PROGRESS_BAR_FILL = '[data-test-id="progress-bar-fill"]';
const PROGRESS_HEADER_VALUE = '[data-test-id="progress-header-value"]';
const CHECKBOX = '[data-test-id="checkbox"]';
const CHECKBOX_LABEL = '[data-test-id="checkbox-label"]';
const CHECKBOX_DATE = '[data-test-id="checkbox-date"]';

const DRAGGABLE_ITEM = '[data-test-id=draggable-item]';
const INSERTION_INDICATOR = '[data-test-id=insertion-indicator]';

const createContentArray = (length: number, fixedParams?: Partial<ChecklistContent>) => {
    const createRandomItem = (fixedParams?: Partial<ChecklistContent>) => {
        const item = createItem('text');
        item.completed = Math.random() > 0.5;
        return { ...item, ...fixedParams };
    };
    return Array.from({ length })
        .fill(0)
        .map(() => createRandomItem(fixedParams));
};

const testSettings: Settings = {
    content: [],
    hasExtendedCustomPadding: false,
    extendedPaddingChoice: Padding.Large,
    extendedPaddingTop: '0px',
    extendedPaddingBottom: '0px',
    extendedPaddingLeft: '0px',
    extendedPaddingRight: '0px',
    incompleteTextColor: { r: 45, g: 50, b: 50, a: 1 },
    incompleteCheckboxColor: { r: 108, g: 112, b: 112, a: 1 },
    completeTextColor: { r: 255, g: 55, b: 90, a: 1 },
    completeCheckboxColor: { r: 255, g: 55, b: 90, a: 1 },
    completedDecoration: ChecklistDecoration.Strikethrough,
    highlightColor: { r: 190, g: 225, b: 212, a: 1 },
    dateVisible: true,
    progressBarVisible: true,
    progressBarType: ProgressBarType.Bar,
    progressBarFillColor: { r: 0, g: 200, b: 165, a: 1 },
    progressBarTrackColor: { r: 222, g: 240, b: 233, a: 1 },
    strikethroughStyle: StrikethroughType.Dashed,
    strikethroughWidth: '5px',
    strikethroughColor: { r: 255, g: 55, b: 90, a: 1 },
};

describe('Checklist Block', () => {
    it('Renders a checklist block', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {});

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_BLOCK_SELECTOR).should('exist');
    });

    it('Displays the correct number of checklist items in View Mode', () => {
        const length = randomInteger(0, 10);
        const content = createContentArray(length);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, { blockSettings: { content } });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_ITEM).should('have.length', length);
    });

    it('Displays the correct number of checklist items in Edit Mode', () => {
        const length = Math.ceil(Math.random() * 10);
        const content = createContentArray(length);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', length);
    });

    it('Allows users to create new item in Edit Mode', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content: [] },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 0);
        cy.get(CHECKLIST_ITEM_CREATOR).should('be.visible').find(TEXT_EDITOR).type('Test{Enter}', { force: true });
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 1);
        cy.get(CHECKLIST_ITEM_CREATOR).should('be.visible').find(TEXT_EDITOR).should('have.value', '');
    });

    it('Allows users to remove item in Edit Mode', () => {
        const content = createContentArray(5);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 5);
        cy.get(CONTROL_BUTTONS).first().find('button').last().focus().click();
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).should('have.length', 4);
    });

    it('Allows users to move item up or down in Edit Mode', () => {
        const content = createContentArray(3);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER).find(CHECKLIST_ITEM).first().realHover();
        cy.get(CHECKLIST_CONTAINER)
            .find(DRAGGABLE_ITEM)
            .first()
            .then(($firstItem) => {
                const firstItemKey = $firstItem.data('key');
                cy.wrap($firstItem).find(CONTROL_BUTTONS).should('be.visible').find('button').eq(1).click();
                cy.get(CHECKLIST_CONTAINER)
                    .find(DRAGGABLE_ITEM)
                    .first()
                    .then(($newFirstItem) => {
                        const newFirstItemKey = $newFirstItem.data('key');
                        expect(newFirstItemKey).not.to.equal(firstItemKey);
                    });
            });
    });

    it('Allows users to move item with keyboard', () => {
        const content = createContentArray(3, { completed: false });
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(DRAGGABLE_ITEM)
            .first()
            .then(($firstItem) => {
                const firstItemKey = $firstItem.data('key');
                cy.wrap($firstItem).should('be.focused').realPress('ArrowLeft');
                cy.get(CONTROL_BUTTONS).first().find('button').last().should('be.focused').realPress('ArrowLeft');
                cy.get(CONTROL_BUTTONS).first().find('button').eq(1).should('be.focused').click();
                cy.get(CHECKLIST_CONTAINER)
                    .find(DRAGGABLE_ITEM)
                    .first()
                    .then(($newFirstItem) => {
                        const newFirstItemKey = $newFirstItem.data('key');
                        expect(newFirstItemKey).not.to.equal(firstItemKey);
                    });
                cy.get(CHECKLIST_CONTAINER)
                    .find(DRAGGABLE_ITEM)
                    .eq(1)
                    .then(($secondItem) => {
                        const secondItemKey = $secondItem.data('key');
                        expect(firstItemKey).to.equal(secondItemKey);
                    });
            });
    });

    it('Allows users to remove item with keyboard', () => {
        const length = randomInteger(3, 10);
        const content = createContentArray(length, { completed: false });
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(DRAGGABLE_ITEM)
            .should('have.length', length)
            .first()
            .then(($firstItem) => {
                const firstItemKey = $firstItem.data('key');
                cy.wrap($firstItem).should('be.focused').realPress('ArrowLeft');
                cy.get(CONTROL_BUTTONS).first().find('button').last().should('be.focused').click();
                cy.get(CHECKLIST_CONTAINER)
                    .find(DRAGGABLE_ITEM)
                    .should('have.length', length - 1)
                    .first()
                    .then(($newFirstItem) => {
                        const newFirstItemKey = $newFirstItem.data('key');
                        expect(newFirstItemKey).not.to.equal(firstItemKey);
                    });
            });
    });

    it('Allows users to create item with keyboard', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content: [] },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(DRAGGABLE_ITEM).should('have.length', 0);
        cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused').type('TEXT{Enter}');
        cy.get(DRAGGABLE_ITEM).should('have.length', 1).find(TEXT_EDITOR).should('have.text', 'TEXT');
        cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused');
        cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('be.focused').type('{Enter}');
        cy.get(CHECKLIST_ITEM_CREATOR).find(TEXT_EDITOR).should('not.be.focused');
    });

    it('Disables List modifications in View Mode', () => {
        const completedItems = createContentArray(1, { completed: true });
        const incompleteItems = createContentArray(1, { completed: false });
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: false,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_ITEM_CREATOR).should('have.length', 0);
        cy.get(CONTROL_BUTTONS)
            .find('button')
            .each(($button) => {
                expect($button).to.be.disabled;
            });
        cy.get(TEXT_EDITOR).invoke('attr', 'contenteditable').should('equal', 'false');
        cy.get(DRAGGABLE_ITEM).first().realPress('Space');
        cy.get(INSERTION_INDICATOR).should('have.length', 0);
    });

    it('Disables Up arrow if first item and Down arrow if last item', () => {
        const content = createContentArray(3);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_CONTAINER)
            .find(CHECKLIST_ITEM)
            .first()
            .find(CONTROL_BUTTONS)
            .find('button')
            .each(($button, index) =>
                index === 0 ? expect($button).to.be.disabled : expect($button).not.to.be.disabled
            );
        cy.get(CHECKLIST_CONTAINER)
            .find(CHECKLIST_ITEM)
            .last()
            .find(CONTROL_BUTTONS)
            .find('button')
            .each(($button, index) =>
                index === 1 ? expect($button).to.be.disabled : expect($button).not.to.be.disabled
            );
    });

    it('Can hide/show completed tasks in View mode', () => {
        const completedItems = createContentArray(5, { completed: true });
        const incompleteItems = createContentArray(5, { completed: false });
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, { blockSettings: { content } });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_ITEM).should('have.length', 10);
        cy.get('[checked]').should('have.length', 5);
        cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
        cy.get(COMPLETED_VISIBILITY_BUTTON).should('be.visible');
        cy.get(COMPLETED_VISIBILITY_BUTTON)
            .find('button')
            .should('be.visible')
            .then(($button) => {
                const text = $button.text();
                expect(text).to.match(/Hide/);
                // TODO: remove {force: true} when tailwind is bundled correctly in cypress
                cy.wrap($button).click({ force: true });
            });
        cy.get(CHECKLIST_ITEM).should('have.length', 5);
        cy.get('[checked]').should('have.length', 0);
    });

    it('Cannot hide/show completed tasks in Edit mode', () => {
        const completedItems = createContentArray(5, { completed: true });
        const incompleteItems = createContentArray(5, { completed: false });
        const content = [...completedItems, ...incompleteItems];
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content },
            editorState: true,
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
        cy.get(CHECKLIST_BLOCK_SELECTOR).realHover();
        cy.get(COMPLETED_VISIBILITY_BUTTON).should('not.be.visible');
    });

    it('Hides progress bar if no checklist items', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content: [], progressBarType: ProgressBarType.Bar, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_BAR).should('have.length', 0);
    });

    it('Shows progress bar if setting is true and checklist is not empty', () => {
        const content = createContentArray(1);
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Bar, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_BAR).should('be.visible', 1);
    });

    it('Correctly displays calculated percentage in fraction', () => {
        const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
        const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const completedLength = completedItems.length;
        const totalLength = content.length;

        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Fraction, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${completedLength}/${totalLength}`);
    });

    it('Correctly displays calculated percentage in percentage', () => {
        const completedItems = createContentArray(randomInteger(0, 10), { completed: true });
        const incompleteItems = createContentArray(randomInteger(0, 10), { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const completedLength = completedItems.length;
        const totalLength = content.length;
        const percentage = ((completedLength / totalLength) * 100).toFixed(0);

        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { content, progressBarType: ProgressBarType.Percentage, progressBarVisible: true },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(PROGRESS_HEADER_VALUE).should('be.visible').and('have.text', `${percentage}%`);
    });

    it('Correctly renders styles provided by settings', () => {
        const completedItems = createContentArray(5, { completed: true });
        const incompleteItems = createContentArray(5, { completed: false });
        const content = [...completedItems, ...incompleteItems];

        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: { ...testSettings, content },
        });

        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX).each(($item) => {
            const border = $item.css('border-color');
            const fill = $item.css('background-color');
            const checked = $item.data('checked');
            if (checked) {
                expect(border).to.equal(toRgbaString(testSettings.completeCheckboxColor));
                expect(fill).to.equal(toRgbaString(testSettings.completeCheckboxColor));
            } else {
                expect(border).to.equal(toRgbaString(testSettings.incompleteCheckboxColor));
                expect(fill).to.equal('rgb(255, 255, 255)');
            }
        });
        cy.get(TEXT_EDITOR).each(($editor) => {
            const color = $editor.css('color');
            expect(color).to.equal(toRgbaString(testSettings.incompleteTextColor));
        });
        cy.get(CHECKBOX_LABEL)
            .find('span')
            .each(($labelSection) => {
                const color = $labelSection.css('color');
                const textDecoration = $labelSection.css('text-decoration-line');
                const strikethroughStyle = $labelSection.css('text-decoration-style');
                const strikethroughThickness = $labelSection.css('text-decoration-thickness');
                const strikethroughColor = $labelSection.css('text-decoration-color');
                expect(color).to.equal(toRgbaString(testSettings.completeTextColor));
                expect(textDecoration).to.equal('line-through');
                expect(strikethroughStyle).to.equal(StrikethroughStyleType[testSettings.strikethroughStyle]);
                expect(strikethroughThickness).to.equal(testSettings.strikethroughWidth);
                expect(strikethroughColor).to.equal(toRgbaString(testSettings.strikethroughColor));
            });
        cy.get(PROGRESS_BAR).should('have.css', 'background-color', toRgbaString(testSettings.progressBarTrackColor));
        cy.get(PROGRESS_BAR_FILL).should(
            'have.css',
            'background-color',
            toRgbaString(testSettings.progressBarFillColor)
        );
        cy.get(CHECKLIST_BLOCK_SELECTOR).should(
            'have.css',
            'padding',
            paddingStyleMap[testSettings.extendedPaddingChoice]
        );
        cy.get(CHECKBOX_DATE).should('have.length', 5);
    });

    it('Uses custom padding if advanced it set to true', () => {
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: {
                hasExtendedCustomPadding: true,
                extendedPaddingChoice: Padding.Large,
                extendedPaddingTop: '3px',
                extendedPaddingRight: '5px',
                extendedPaddingBottom: '6px',
                extendedPaddingLeft: '4px',
            },
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKLIST_BLOCK_SELECTOR).should('have.css', 'padding', '3px 5px 6px 4px');
    });

    it('Does not show date if visibility is off', () => {
        const content = createContentArray(5, { completed: true });
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: {
                content,
                dateVisible: false,
            },
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX_DATE).should('have.length', 0);
    });

    it('Correctly displays highlight color', () => {
        const content = createContentArray(5, { completed: true });
        const highlightColor = { r: 85, g: 85, b: 85 };
        const [ChecklistBlockWithStubs] = withAppBridgeStubs(ChecklistBlock, {
            blockSettings: {
                content,
                completedDecoration: ChecklistDecoration.Highlight,
                highlightColor,
            },
        });
        mount(<ChecklistBlockWithStubs />);
        cy.get(CHECKBOX_LABEL).find('span').should('have.css', 'background-color', toRgbaString(highlightColor));
    });
});
