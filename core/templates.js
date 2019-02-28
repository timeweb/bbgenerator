module.exports.view = (name, templateName, className) => `${createImport('{ View }', 'backbone.marionette')}${
    templateName ? '\n' + createImport(`${templateName}Template`, `./${templateName}.hbs`) : ''
}

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

module.exports.collectionView = (name, templateName, className, childViewName) => `${createImport(
    '{ CollectionView }',
    'backbone.marionette'
)}
${createImport(childViewName, `./${childViewName}.js`)}${
    templateName ? '\n' + createImport(`${templateName}Template`, `./${templateName}.hbs`) : ''
}

const ${name} = CollectionView.extend({
    className: '${className}',${templateName ? `\n    template: ${templateName}Template,` : ''}
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

module.exports.model = name => `${createImport('Backbone', 'backbone')}

export default class ${name} extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[${name}]: initialize'); }
    validation = {};
}

`;

module.exports.collection = (name, modelName) => `${createImport('Backbone', 'backbone')}${
    modelName ? '\n' + createImport(modelName, `./${modelName}.js`) : ''
}

export default class ${name} extends Backbone.Collection {${modelName ? `\n    model = ${modelName};` : ''}
    initialize(attributes, options) { console.log('[${name}]: initialize'); }
}

`;

function createImport(name, from) {
    return `import ${name} from '${from}';`;
}
