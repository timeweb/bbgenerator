import program from 'commander';
import ViewGenerator from './core/ViewGenerator';
import { Options } from './core/types';
import { init, success } from './core/utils';

const TYPE: string = 'View';

async function run(entityName: string, options: Options): Promise<void> {
    init(TYPE);
    
    const gen: ViewGenerator = new ViewGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.entity);
}

program
    .usage('[options] <componentName>')
    .option('-n, --name [name]', 'Имя view')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action((file, cmd = {}) => {
        const componentName: string = typeof file === 'string' ? file : '';
        const templateName: string = typeof cmd.name === 'string' ? cmd.name || '' : '';
        run(componentName, {
            name: templateName,
            path: program.path,
        });
    })
    .parse(process.argv);
