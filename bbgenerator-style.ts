import program from 'commander';
import StyleGenerator from './core/StyleGenerator';
import { Options } from './core/types';
import { init, success } from './core/utils';

const TYPE: string = 'Style';

async function run(entityName: string, options: Options): Promise<void> {
    init(TYPE);
    const gen: StyleGenerator = new StyleGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.rootEntity);
}

program
    .usage('[options] <componentName>')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action(file => {
        const componentName: string = typeof file === 'string' ? file : '';
        run(componentName, { name: componentName, path: program.path });
    })
    .parse(process.argv);
