import program from 'commander';
import TemplateGenerator from './core/TemplateGenerator';
import { Options } from './core/types';
import { init, success } from './core/utils';

const TYPE: string = 'Template';

async function run(entityName: string, options: Options): Promise<void> {
    init(TYPE);
    const gen: TemplateGenerator = new TemplateGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.rootEntity);
}

program
    .usage('[options] <componentName>')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .option('-n, --name [name]', 'Название шаблона')
    .action((file, cmd = {}) => {
        const componentName: string = typeof file === 'string' ? file : '';
        const templateName: string = typeof cmd.name === 'string' ? cmd.name || componentName : componentName;
        run(componentName, {
            name: templateName,
            path: program.path,
        });
    })
    .parse(process.argv);
