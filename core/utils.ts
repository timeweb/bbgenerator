import GenerationEntity from './GenerationEntity';
import chalk from 'chalk';
import * as figlet from 'figlet';

export function initLogo(): void {
    console.log(
        chalk.cyan(
            figlet.textSync('Backbone', {
                font: 'Stop',
                horizontalLayout: 'fitted',
                verticalLayout: 'default',
            })
        )
    );
    console.log(
        chalk.cyan(
            figlet.textSync('Generator', {
                font: 'Stop',
                horizontalLayout: 'fitted',
                verticalLayout: 'default',
            })
        )
    );
}

export function init(type: string): void {
    console.log(chalk.blue(`Начинаем создавать ${type}:`));
}

export function success(entity: GenerationEntity): void {
    console.log(chalk.white.bgGreen.bold(`Готово! Тип: ${entity.type} создан для компонента: ${entity.name}`));
}
