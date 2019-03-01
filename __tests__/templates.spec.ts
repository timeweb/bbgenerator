import * as templates from '../core/templates';

describe('templates', () => {
    it('model', () => {
        // Arrange
        const name: string = 'AddModel';
        // Act
        const template: string = templates.model(name);

        // Assert
        expect(template).toBe(`import Backbone from 'backbone';

export default class AddModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AddModel]: initialize'); }
    validation = {};
}
`);
    });
    it('collection', () => {
        // Arrange
        const name: string = 'AddCollection';
        const modelName: string = 'AddModel';
        // Act
        const template: string = templates.collection(name, modelName);

        // Assert
        expect(template).toBe(`import Backbone from 'backbone';
import AddModel from './AddModel.js';

export default class AddCollection extends Backbone.Collection {
    model = AddModel;
    initialize(attributes, options) { console.log('[AddCollection]: initialize'); }
}
`);
    });

    it('view', () => {
        // Arrange
        const name: string = 'Add';
        const templateName: string = 'add';
        const className: string = 'add';
        // Act
        const template: string = templates.view(name, templateName, className);

        // Assert
        expect(template).toBe(`import { View } from 'backbone.marionette';
import addTemplate from './add.hbs';

const Add = View.extend({
    className: 'add',
    template: addTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Add]: initialize') },
    onRender() { console.log('[Add]: onRender') },
});

export default Add;
`);
    });

    it('collectionView', () => {
        // Arrange
        const name: string = 'Add';
        const templateName: string = 'add';
        const childViewName: string = 'addItem';
        const className: string = 'add';
        // Act
        const template: string = templates.collectionView(name, templateName, className, childViewName);

        // Assert
        expect(template).toBe(`import { CollectionView } from 'backbone.marionette';
import addItem from './addItem.js';
import addTemplate from './add.hbs';

const Add = CollectionView.extend({
    className: 'add',
    template: addTemplate,
    childView: addItem,
    // childViewContainer: '.js-container',
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Add]: initialize') },
    onRender() { console.log('[Add]: onRender') },
});

export default Add;
`);
    });
});
