import Generator from './Generator';
import ViewGenerator from './ViewGenerator';
import TemplateGenerator from './TemplateGenerator';
import ModelGenerator from './ModelGenerator';
import CollectionGenerator from './CollectionGenerator';
import CollectionViewGenerator from './CollectionViewGenerator';
import ComponentGenerator from './ComponentGenerator';
import StyleGenerator from './StyleGenerator';
import { Question } from 'inquirer';
import { Options } from './types';
import inquirer = require('inquirer');

type InterfaceGenerator =
    | typeof ModelGenerator
    | typeof StyleGenerator
    | typeof TemplateGenerator
    | typeof ModelGenerator
    | typeof CollectionGenerator
    | typeof ViewGenerator
    | typeof CollectionViewGenerator;

const types: { [key: string]: InterfaceGenerator } = {
    Component: ComponentGenerator,
    Model: ModelGenerator,
    Collection: CollectionGenerator,
    View: ViewGenerator,
    CollectionView: CollectionViewGenerator,
    Template: TemplateGenerator,
    Style: StyleGenerator,
};

export default class UIGenerator extends Generator {
    type: string = 'UI';

    async askQuestions(componentName?: string): Promise<Options> {
        const { name, ...answers } = await super.askQuestions(componentName || '');
        const newOptions = Object.entries(answers).reduce((prev: any, [key, value]) => {
            prev[key] = value;
            return prev;
        }, {});
        Object.assign(this.options, newOptions);
        return { name, path: this.options.path };
    }

    getQuestions(componentName?: string): Question[] {
        const questions: Question[] = [
            {
                type: 'list',
                name: 'type',
                when: !types.hasOwnProperty(<string>this.options.type),
                message: 'Выберите тип создоваемой сущности?',
                choices: Object.keys(types),
            },
            {
                name: 'name',
                type: 'input',
                when: !componentName,
                message: (answers: inquirer.Answers) => `Ведите название для ${answers.type || this.options.type}?`,
            },
            {
                name: 'path',
                type: 'input',
                message: (answers: inquirer.Answers) => {
                    return `${answers.type || this.options.type} будет создан тут:`;
                },
                default: process.cwd(),
            },
            {
                name: 'itemView',
                type: 'list',
                when: (answers: inquirer.Answers) => {
                    const type = answers.type || this.options.type;
                    return type === 'Component';
                },
                message: 'View или CollectionView?',
                choices: ['View', 'CollcetionView'],
            },
            {
                name: 'COLLECTION_CONFIRM',
                type: 'confirm',
                when: (answers: inquirer.Answers) => {
                    const type = answers.type || this.options.type;
                    return type === 'Component';
                },
                message: `Добавить коллекцию?`,
                default: false,
            },
            {
                name: 'collection',
                type: 'input',
                when: (answers: inquirer.Answers) => {
                    const type = answers.type || this.options.type;
                    return type === 'Component' && answers.COLLECTION_CONFIRM;
                },
                message: `Название коллекции?`,
                default: (answers: inquirer.Answers) => answers.name || componentName,
            },
            {
                name: 'MODEL_CONFIRM',
                type: 'confirm',
                when: (answers: inquirer.Answers) => {
                    const type = answers.type || this.options.type;
                    return ['Collection', 'Component'].includes(type);
                },
                message: `Добавить модель?`,
                default: false,
            },
            {
                name: 'model',
                type: 'input',
                when: (answers: inquirer.Answers) => {
                    const type: string = answers.type || this.options.type || '';
                    return ['Collection', 'Component'].includes(type) && answers.MODEL_CONFIRM;
                },
                message: `Название модели?`,
                default: (answers: inquirer.Answers) => answers.name || componentName,
            },
        ];
        return questions;
    }

    async generate() {
        const GenClass: InterfaceGenerator = types[<string>this.options.type];
        const generator: Generator = new GenClass(this.options, this.rootEntity);
        await generator.run();
    }
}
