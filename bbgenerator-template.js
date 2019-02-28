const chalk = require('chalk');
const program = require('commander');
const TemplateGenerator = require('./core/TemplateGenerator.js');

const TYPE = 'Template';

const init = type => {
    console.log(chalk.blue(`Start ${type} creating:`));
};

const success = ({ type, name }) => {
    console.log(chalk.white.bgGreen.bold(`Done! ${type} created at ${name}`));
};

const run = async (entityName, options) => {
    init(TYPE);
    const gen = new TemplateGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.parentEntity);
};

program
    .usage('[options] <componentName>')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .option('-n, --name [name]', 'Название шаблона')
    .action((file, op) => {
        run(typeof file === 'string' ? file : undefined, {
            path: program.path,
            name: program.name,
        });
    })
    .parse(process.argv);
