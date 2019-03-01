import CollectionViewGenerator from '../core/CollectionViewGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('CollectionViewGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const expectedTemplateItemViewArguments: string[] = [
            './asdDss/asdDssItemView.hbs',
            `<b>template for AsdDssItemView</b>`,
        ];
        const expectedItemViewArguments: string[] = [
            './asdDss/AsdDssItemView.js',
            `import { View } from 'backbone.marionette';
import asdDssItemViewTemplate from './asdDssItemView.hbs';

const AsdDssItemView = View.extend({
    className: 'asd-dss__asd-dss-item-view',
    template: asdDssItemViewTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDssItemView]: initialize') },
    onRender() { console.log('[AsdDssItemView]: onRender') },
});

export default AsdDssItemView;
`,
        ];
        const expectedTemplateArguments: string[] = ['./asdDss/asdDss.hbs', `<b>template for AsdDss</b>`];
        const expectedViewArguments: string[] = [
            './asdDss/AsdDss.js',
            `import { CollectionView } from 'backbone.marionette';
import AsdDssItemView from './AsdDssItemView.js';
import asdDssTemplate from './asdDss.hbs';

const AsdDss = CollectionView.extend({
    className: 'asd-dss',
    template: asdDssTemplate,
    childView: AsdDssItemView,
    // childViewContainer: '.js-container',
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDss]: initialize') },
    onRender() { console.log('[AsdDss]: onRender') },
});

export default AsdDss;
`,
        ];

        const componentName: string = 'AsdDss';
        const gen: CollectionViewGenerator = new CollectionViewGenerator({ path: '.', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(4);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
    });

    it('generate with custom name ', async () => {
        // Arrange
        const expectedTemplateItemViewArguments: string[] = [
            './asdDss/dddsItemView.hbs',
            `<b>template for DddsItemView</b>`,
        ];
        const expectedItemViewArguments: string[] = [
            './asdDss/DddsItemView.js',
            `import { View } from 'backbone.marionette';
import dddsItemViewTemplate from './dddsItemView.hbs';

const DddsItemView = View.extend({
    className: 'asd-dss__ddds-item-view',
    template: dddsItemViewTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[DddsItemView]: initialize') },
    onRender() { console.log('[DddsItemView]: onRender') },
});

export default DddsItemView;
`,
        ];
        const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
        const expectedViewArguments: string[] = [
            './asdDss/Ddds.js',
            `import { CollectionView } from 'backbone.marionette';
import DddsItemView from './DddsItemView.js';
import dddsTemplate from './ddds.hbs';

const Ddds = CollectionView.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    childView: DddsItemView,
    // childViewContainer: '.js-container',
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
        ];

        const componentName: string = 'AsdDss';
        const gen: CollectionViewGenerator = new CollectionViewGenerator({ path: '.', name: 'Ddds' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(4);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
    });
});
