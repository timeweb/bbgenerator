const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');
const ViewGenerator = require('./ViewGenerator.js');
const TemplateGenerator = require('./TemplateGenerator.js');
const ModelGenerator = require('./ModelGenerator.js');
const CollectionGenerator = require('./CollectionGenerator.js');
const CollectionViewGenerator = require('./CollectionViewGenerator.js');
const ComponentGenerator = require('./ComponentGenerator.js');
const StyleGenerator = require('./StyleGenerator.js');

const types = {
    Component: ComponentGenerator,
    Model: ModelGenerator,
    Collection: CollectionGenerator,
    View: ViewGenerator,
    CollectionView: CollectionViewGenerator,
    Template: TemplateGenerator,
    Style: StyleGenerator,
};

class UIGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'UI';
    }

    async askQuestions(componentName) {
        const { name, ...answers } = await super.askQuestions(componentName);
        const newOptions = Object.entries(answers).reduce((prev, [key, value]) => {
            prev[key] = value;
            return prev;
        }, {});
        Object.assign(this.options, newOptions);
        return { name };
    }

    getQuestions(componentName) {
        const questions = [
            {
                type: 'list',
                name: 'type',
                when: !types.hasOwnProperty(this.options.type),
                message: 'Выберите тип создоваемой сущности?',
                choices: Object.keys(types),
            },
            {
                name: 'name',
                type: 'input',
                when: !componentName,
                message: answers => `Ведите название для ${answers.type || this.options.type}?`,
            },
            {
                name: 'path',
                type: 'input',
                message: answers => {
                    return `${answers.type || this.options.type} будет создан тут:`;
                },
                default: process.cwd(),
            },
            {
                name: 'itemView',
                type: 'list',
                when: answers => {
                    const type = answers.type || this.options.type;
                    return type === 'Component';
                },
                message: 'View или CollectionView?',
                choices: ['View', 'CollcetionView'],
            },
            {
                name: 'COLLECTION_CONFIRM',
                type: 'confirm',
                when: answers => {
                    const type = answers.type || this.options.type;
                    return type === 'Component';
                },
                message: answers => {
                    return `Добавить коллекцию?`;
                },
                default: false,
            },
            {
                name: 'collection',
                type: 'input',
                when: answers => {
                    const type = answers.type || this.options.type;
                    return type === 'Component' && answers.COLLECTION_CONFIRM;
                },
                message: answers => {
                    return `Название коллекции?`;
                },
                default: answers => answers.name || componentName,
            },
            {
                name: 'MODEL_CONFIRM',
                type: 'confirm',
                when: answers => {
                    const type = answers.type || this.options.type;
                    return ['Collection', 'Component'].includes(type);
                },
                message: answers => {
                    return `Добавить модель?`;
                },
                default: false,
            },
            {
                name: 'model',
                type: 'input',
                when: answers => {
                    const type = answers.type || this.options.type;
                    return ['Collection', 'Component'].includes(type) && answers.MODEL_CONFIRM;
                },
                message: answers => {
                    return `Добавить модель?`;
                },
                default: answers => answers.name || componentName,
            },
        ];
        return questions;
    }

    async generate() {
        const generator = new types[this.options.type](this.options, this.parentEntity);
        await generator.run();
    }
}

module.exports = UIGenerator;
