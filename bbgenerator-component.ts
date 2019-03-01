import program from 'commander';
import ComponentGenerator from './core/ComponentGenerator';
import { Options } from './core/types';
import { init, success } from './core/utils';

const TYPE: string = 'Component';

async function run(entityName: string, options: Options): Promise<void> {
    init(TYPE);
    const gen: ComponentGenerator = new ComponentGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.rootEntity);
}

program
    .usage('[options] <componentName>')
    .option('-m, --model [name]', 'Добавить model')
    .option('-c, --collection [name]', 'Добавить collection')
    .option('-i, --item-view [name]', 'Создать CollectionView')
    .option('-p, --path [path]', 'Путь до папки в которой создавать', process.cwd())
    .action(file => {
        const componentName: string = typeof file === 'string' ? file : '';
        run(componentName, {
            name: componentName,
            model: program.model,
            collection: program.collection,
            path: program.path,
            itemView: program.itemView,
        });
    })
    .parse(process.argv);
