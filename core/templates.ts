export const view = (name: string, templateName: string, className: string): string => `${createImport(
    '{ View }',
    'backbone.marionette'
)}${templateName ? '\n' + createImport(`${templateName}Template`, `./${templateName}.hbs`) : ''}

const ${name} = View.extend({
    className: '${className}',${templateName ? `\n    template: ${templateName}Template,` : ''}
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[${name}]: initialize') },
    onRender() { console.log('[${name}]: onRender') },
});

export default ${name};
`;

export const collectionView = (
    name: string,
    templateName: string,
    className: string,
    childViewName: string
): string => `${createImport('{ CollectionView }', 'backbone.marionette')}
${createImport(childViewName, `./${childViewName}.js`)}
${createImport(`${templateName}Template`, `./${templateName}.hbs`)}

const ${name} = CollectionView.extend({
    className: '${className}',
    template: ${templateName}Template,
    childView: ${childViewName},
    // childViewContainer: '.js-container',
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[${name}]: initialize') },
    onRender() { console.log('[${name}]: onRender') },
});

export default ${name};
`;

export const model = (name: string): string => `${createImport('Backbone', 'backbone')}

export default class ${name} extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[${name}]: initialize'); }
    validation = {};
}
`;

export const collection = (name: string, modelName: string): string => `${createImport('Backbone', 'backbone')}${
    modelName ? '\n' + createImport(modelName, `./${modelName}.js`) : ''
}

export default class ${name} extends Backbone.Collection {${modelName ? `\n    model = ${modelName};` : ''}
    initialize(attributes, options) { console.log('[${name}]: initialize'); }
}
`;

function createImport(name: string, from: string): string {
    return `import ${name} from '${from}';`;
}
