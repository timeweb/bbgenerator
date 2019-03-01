import program from 'commander';
import UIGenerator from './core/UIGenerator';
import { Options } from './core/types';
import { success, initLogo } from './core/utils';

async function run(entityName: string, options: Options): Promise<void> {
    initLogo();
    const uiGenerator: UIGenerator = new UIGenerator(options);
    await uiGenerator.run(entityName);
    
    console.log();
    success(uiGenerator.rootEntity);
};

program
    .usage('[options] <entityName>')
    .option('-t, --type [type]', 'Тип создаваемой сущности')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action(file => {
        const componentName: string = typeof file === 'string' ? file : '';
        run(componentName, {
            name: componentName,
            path: program.path,
            type: program.type,
        });
    })
    .parse(process.argv);
