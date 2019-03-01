import * as fabric from '../core/fabric';
import { OutputTemplateData, InputTemplateData, InputCollectionViewTemplateData } from '../core/types';
import GenerationEntity from '../core/GenerationEntity';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('fabric', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('createStyle', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'Asd',
            folderName: 'asd',
            type: 'View',
        };
        const tData: InputTemplateData = {
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: 'asd',
            name: 'asd',
            path: './asd/asd.scss',
            type: 'Style',
        };
        const body: string = '.asd {}';
        // Act
        const data: OutputTemplateData = fabric.createStyle(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createTemplate', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'asd',
            folderName: 'asd',
            type: '',
        };
        const tData: InputTemplateData = {
            name: 'Fff',
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: 'asd',
            name: 'asd',
            path: './asd/asd.hbs',
            type: 'Template',
        };
        const body: string = `<b>template for ${tData.name}</b>`;

        // Act
        const data: OutputTemplateData = fabric.createTemplate(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createModel', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'AsdModel',
            folderName: 'asd',
            type: '',
        };
        const tData: InputTemplateData = {
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/AsdModel.js',
            type: 'Model',
        };
        const body: string = `import Backbone from 'backbone';

export default class ${entityView.name} extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[${entityView.name}]: initialize'); }
    validation = {};
}
`;

        // Act
        const data: OutputTemplateData = fabric.createModel(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createCollection with model', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'AsdCollection',
            folderName: 'asd',
            type: '',
        };
        const tData: OutputTemplateData = {
            name: 'AsdModel',
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/AsdCollection.js',
            type: 'Collection',
        };
        const body: string = `import Backbone from 'backbone';
import AsdModel from './AsdModel.js';

export default class ${entityView.name} extends Backbone.Collection {
    model = AsdModel;
    initialize(attributes, options) { console.log('[${entityView.name}]: initialize'); }
}
`;

        // Act
        const data: OutputTemplateData = fabric.createCollection(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createCollection with out model', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'AsdCollection',
            folderName: 'asd',
            type: '',
        };
        const tData: InputTemplateData = {
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/AsdCollection.js',
            type: 'Collection',
        };
        const body: string = `import Backbone from 'backbone';

export default class ${entityView.name} extends Backbone.Collection {
    initialize(attributes, options) { console.log('[${entityView.name}]: initialize'); }
}
`;

        // Act
        const data: OutputTemplateData = fabric.createCollection(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createView', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'Asd',
            folderName: 'asd',
            type: '',
        };
        const tData: InputTemplateData = {
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/Asd.js',
            type: 'View',
        };
        const body: string = `import { View } from 'backbone.marionette';
import asdTemplate from './asd.hbs';

const Asd = View.extend({
    className: 'asd',
    template: asdTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Asd]: initialize') },
    onRender() { console.log('[Asd]: onRender') },
});

export default Asd;
`;

        // Act
        const data: OutputTemplateData = fabric.createView(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createView custom name', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'Fff',
            folderName: 'asd',
            type: '',
        };
        const tData: InputTemplateData = {
            name: 'Fff',
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/Fff.js',
            type: 'View',
        };
        const body: string = `import { View } from 'backbone.marionette';
import fffTemplate from './fff.hbs';

const Fff = View.extend({
    className: 'asd__fff',
    template: fffTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Fff]: initialize') },
    onRender() { console.log('[Fff]: onRender') },
});

export default Fff;
`;

        // Act
        const data: OutputTemplateData = fabric.createView(entityView, tData);

        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });

    it('createCollectionView', () => {
        // Arrange
        const entityView: GenerationEntity = {
            name: 'Asd',
            folderName: 'asd',
            type: '',
        };
        const tData: InputCollectionViewTemplateData = {
            childViewName: 'AsdItem',
            path: '.',
        };
        const expected: OutputTemplateData = {
            folder: entityView.folderName,
            name: entityView.name,
            path: './asd/Asd.js',
            type: 'CollectionView',
        };
        const body: string = `import { CollectionView } from 'backbone.marionette';
import AsdItem from './AsdItem.js';
import asdTemplate from './asd.hbs';

const Asd = CollectionView.extend({
    className: 'asd',
    template: asdTemplate,
    childView: AsdItem,
    // childViewContainer: '.js-container',
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Asd]: initialize') },
    onRender() { console.log('[Asd]: onRender') },
});

export default Asd;
`;

        // Act
        const data: OutputTemplateData = fabric.createCollectionView(entityView, tData);
        
        // Assert
        expect(data).toEqual(expected);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([expected.path, body, { flag: 'w' }]);
    });
});
