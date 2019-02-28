#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const pj = require('./package.json');

const version = pj.version;
program
    .version(version)
    .usage('[options] <componentName>')
    .description(pj.description)
    .command('component [options] [name]', 'Создает компонет')
    .command('view [options] [componentName]', 'Создает View')
    .command('collection-view [options] [componentName]', 'Создает CollectionView')
    .command('model [options] [componentName]', 'Создает модель')
    .command('collection [options] [componentName]', 'Создает коллекцию')
    .command('style [options] [componentName]', 'Создает файл стилей')
    .command('template [options] [componentName]', 'Создает файл шаблона')
    .command('ui [options] [name]', 'Интерфейс для создания сущности', { isDefault: true })
    .parse(process.argv);

const init = () => {
    console.log(chalk.bold.blue('Marionette-Backbone Generator', '- v'+version));
    console.log();
};

init();