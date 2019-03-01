import ComponentGenerator from '../core/ComponentGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('ComponentGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const expectedTemplateArguments: string[] = ['./asdDss/asdDss.hbs', `<b>template for AsdDss</b>`];
        const expectedViewArguments: string[] = [
            './asdDss/AsdDss.js',
            `import { View } from 'backbone.marionette';
import asdDssTemplate from './asdDss.hbs';

const AsdDss = View.extend({
    className: 'asd-dss',
    template: asdDssTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDss]: initialize') },
    onRender() { console.log('[AsdDss]: onRender') },
});

export default AsdDss;
`,
        ];
        const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

        const componentName: string = 'AsdDss';
        const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(3);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
    });

    it('generate with model', async () => {
        // Arrange
        const expectedModelArguments: string[] = [
            './asdDss/AsdDssModel.js',
            `import Backbone from 'backbone';

export default class AsdDssModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AsdDssModel]: initialize'); }
    validation = {};
}
`,
        ];
        const expectedTemplateArguments: string[] = ['./asdDss/asdDss.hbs', `<b>template for AsdDss</b>`];
        const expectedViewArguments: string[] = [
            './asdDss/AsdDss.js',
            `import { View } from 'backbone.marionette';
import asdDssTemplate from './asdDss.hbs';

const AsdDss = View.extend({
    className: 'asd-dss',
    template: asdDssTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDss]: initialize') },
    onRender() { console.log('[AsdDss]: onRender') },
});

export default AsdDss;
`,
        ];
        const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

        const componentName: string = 'AsdDss';
        const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: '', model: true });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(4);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
    });

    it('generate with collection', async () => {
        // Arrange
        const expectedCollectionArguments: string[] = [
            './asdDss/AsdDssCollection.js',
            `import Backbone from 'backbone';

export default class AsdDssCollection extends Backbone.Collection {
    initialize(attributes, options) { console.log('[AsdDssCollection]: initialize'); }
}
`,
        ];
        const expectedTemplateArguments: string[] = ['./asdDss/asdDss.hbs', `<b>template for AsdDss</b>`];
        const expectedViewArguments: string[] = [
            './asdDss/AsdDss.js',
            `import { View } from 'backbone.marionette';
import asdDssTemplate from './asdDss.hbs';

const AsdDss = View.extend({
    className: 'asd-dss',
    template: asdDssTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDss]: initialize') },
    onRender() { console.log('[AsdDss]: onRender') },
});

export default AsdDss;
`,
        ];
        const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

        const componentName: string = 'AsdDss';
        const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: '', collection: true });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(4);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
    });

    describe('generate with custom name', () => {
        it('base', async () => {
            // Arrange
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds' });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(3);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ model', async () => {
            // Arrange
            const expectedModelArguments: string[] = [
                './asdDss/DddsModel.js',
                `import Backbone from 'backbone';

export default class DddsModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[DddsModel]: initialize'); }
    validation = {};
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds', model: true });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(4);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ itemView ', async () => {
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
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds', itemView: true });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(5);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateItemViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedItemViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[4]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ collection', async () => {
            // Arrange
            const expectedCollectionArguments: string[] = [
                './asdDss/DddsCollection.js',
                `import Backbone from 'backbone';

export default class DddsCollection extends Backbone.Collection {
    initialize(attributes, options) { console.log('[DddsCollection]: initialize'); }
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds', collection: true });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(4);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ custom collection', async () => {
            // Arrange
            const expectedCollectionArguments: string[] = [
                './asdDss/ACollection.js',
                `import Backbone from 'backbone';

export default class ACollection extends Backbone.Collection {
    initialize(attributes, options) { console.log('[ACollection]: initialize'); }
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds', collection: 'A' });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(4);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ collection and model', async () => {
            // Arrange
            const expectedModelArguments: string[] = [
                './asdDss/DddsModel.js',
                `import Backbone from 'backbone';

export default class DddsModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[DddsModel]: initialize'); }
    validation = {};
}
`,
            ];
            const expectedCollectionArguments: string[] = [
                './asdDss/DddsCollection.js',
                `import Backbone from 'backbone';
import DddsModel from './DddsModel.js';

export default class DddsCollection extends Backbone.Collection {
    model = DddsModel;
    initialize(attributes, options) { console.log('[DddsCollection]: initialize'); }
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({
                path: '.',
                name: 'Ddds',
                collection: true,
                model: true,
            });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(5);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[4]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ custom collection and custom model', async () => {
            // Arrange
            const expectedModelArguments: string[] = [
                './asdDss/BModel.js',
                `import Backbone from 'backbone';

export default class BModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[BModel]: initialize'); }
    validation = {};
}
`,
            ];
            const expectedCollectionArguments: string[] = [
                './asdDss/ACollection.js',
                `import Backbone from 'backbone';
import BModel from './BModel.js';

export default class ACollection extends Backbone.Collection {
    model = BModel;
    initialize(attributes, options) { console.log('[ACollection]: initialize'); }
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({
                path: '.',
                name: 'Ddds',
                collection: 'A',
                model: 'B',
            });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(5);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[4]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });

        it('+ custom model', async () => {
            // Arrange
            const expectedModelArguments: string[] = [
                './asdDss/AModel.js',
                `import Backbone from 'backbone';

export default class AModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AModel]: initialize'); }
    validation = {};
}
`,
            ];
            const expectedTemplateArguments: string[] = ['./asdDss/ddds.hbs', `<b>template for Ddds</b>`];
            const expectedViewArguments: string[] = [
                './asdDss/Ddds.js',
                `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
            ];
            const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

            const componentName: string = 'AsdDss';
            const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: 'Ddds', model: 'A' });

            // Act
            await gen.run(componentName);

            // Assert
            expect(fs.writeFileSync.mock.calls.length).toBe(4);
            expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedViewArguments, { flag: 'w' }]);
            expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
        });
    });

    it('generate collectionView', async () => {
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

        const expectedStyleArguments: string[] = ['./asdDss/asdDss.scss', `.asd-dss {}`];

        const componentName: string = 'AsdDss';
        const gen: ComponentGenerator = new ComponentGenerator({ path: '.', name: '', itemView: true });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(5);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedItemViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[2]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[3]).toEqual([...expectedViewArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[4]).toEqual([...expectedStyleArguments, { flag: 'w' }]);
    });
});
