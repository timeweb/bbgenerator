import chalk from 'chalk';
import inquirer, { Question } from 'inquirer';
import GenerationEntity from './GenerationEntity';
import { Options, OutputTemplateData } from './types';

export default abstract class Generator {
    rootEntity: GenerationEntity;
    options: Options;
    type: string = 'Entity';
    entity: GenerationEntity;

    constructor(options: Options, parent?: GenerationEntity) {
        this.rootEntity = parent || GenerationEntity.create('', this.type);
        this.entity = parent || GenerationEntity.create('', this.type);
        this.options = options;
    }

    async init(componentName?: string): Promise<void> {
        if (!this.rootEntity.name.length) {
            const { name }: Options = await this.askQuestions(componentName || '');
            this.rootEntity = GenerationEntity.create(<string> name || componentName || '', this.type);
        }
        this.entity = new GenerationEntity({ ...this.rootEntity, name: this.getName() });
    }

    getName(): string {
        return this.rootEntity.name;
    }

    askQuestions(componentName: string): Promise<Options> {
        return <Promise<Options>>inquirer.prompt(this.getQuestions(componentName));
    }

    getQuestions(componentName: string): Question[] {
        const questions: Question[] = [
            {
                name: 'name',
                type: 'input',
                when: !componentName,
                message: 'Название компонента?',
            },
        ];
        return questions;
    }

    async run(componentName?: string): Promise<void> {
        await this.init(componentName);
        await this.generate();
    }

    async generate(): Promise<void> {}

    log({ type, name, path }: OutputTemplateData) {
        console.log(chalk.cyan(`- ${type} created:`), chalk.green(<string> name), chalk.grey(path));
    }
}
