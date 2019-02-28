const chalk = require('chalk');
const inquirer = require('inquirer');
const Entity = require('./Entity.js');

class Generator {
    constructor(options = {}, parent = null) {
        this.parentEntity = parent;
        this.options = options;
        this.type = 'Entity';
    }

    async init(componentName) {
        if (!this.parentEntity) {
            const { name } = await this.askQuestions(componentName);
            this.parentEntity = Entity.create(name || componentName, this.type);
        }
        this.entity = new Entity({ ...this.parentEntity, name: this.getName() });
    }

    getName() {
        return this.parentEntity.name;
    }
    
    askQuestions(componentName) {
        return inquirer.prompt(this.getQuestions(componentName));
    }

    getQuestions(componentName) {
        const questions = [
            {
                name: 'name',
                type: 'input',
                when: !componentName,
                message: 'Название компонента?',
            },
        ];
        return questions;
    }

    async run(...args) {
        await this.init(...args);
        await this.generate();
    }

    generate() {
        throw new Error('Переопределите generate');
    }

    log({ type, name, path }) {
        console.log(chalk.cyan(`- ${type} created:`), chalk.green(name), chalk.grey(path));
    }
}

module.exports = Generator;