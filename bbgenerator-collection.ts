import program from 'commander';
import CollectionGenerator from './core/CollectionGenerator';
import { Options } from './core/types';
import { init, success } from './core/utils';

const TYPE: string = 'Collection';

async function run(entityName: string, options: Options): Promise<void> {
    init(TYPE);
    const gen: CollectionGenerator = new CollectionGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.rootEntity);
}

program
    .usage('[options] <componentName>')
    .option('-n, --name [name]', 'Имя коллекции', '')
    .option('-m, --model [name]', 'Нужно ли создавать модель')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action((file, cmd = {}) => {
        const componentName: string = typeof file === 'string' ? file : '';
        const templateName: string = typeof cmd.name === 'string' ? cmd.name || componentName : componentName;
        run(componentName, {
            name: templateName,
            model: program.model,
            path: program.path,
        });
    })
    .parse(process.argv);
