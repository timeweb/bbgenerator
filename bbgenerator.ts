#!/usr/bin/env node

import chalk from 'chalk';
import program from 'commander';
import * as pj from './package.json';

const version: string = (<any>pj).version;
const description: string = (<any>pj).description;

program
    .version(version)
    .usage('[options] <componentName>')
    .description(description)
    .command('component [options] [name]', 'Создает компонет')
    .command('view [options] [componentName]', 'Создает View')
    .command('collection-view [options] [componentName]', 'Создает CollectionView')
    .command('model [options] [componentName]', 'Создает модель')
    .command('collection [options] [componentName]', 'Создает коллекцию')
    .command('style [options] [componentName]', 'Создает файл стилей')
    .command('template [options] [componentName]', 'Создает файл шаблона')
    .command('ui [options] [name]', 'Интерфейс для создания сущности', { isDefault: true })
    .parse(process.argv);

function init(): void {
    console.log(chalk.bold.blue('Marionette-Backbone Generator', '- v' + version));
    console.log();
}

init();
