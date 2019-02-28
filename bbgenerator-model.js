const chalk = require('chalk');
const program = require('commander');
const ModelGenerator = require('./core/ModelGenerator.js');

const TYPE = 'Model';

const init = type => {
    console.log(chalk.blue(`Start ${type} creating:`));
};

const success = ({ type, name }) => {
    console.log(chalk.white.bgGreen.bold(`Done! ${type} created at ${name}`));
};

const run = async (entityName, options) => {
    init(TYPE);
    const gen = new ModelGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.parentEntity);
};

program
    .usage('[options] <componentName>')
    .option('-n, --name [name]', 'Имя модели')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action((file, op) => {
        run(typeof file === 'string' ? file : undefined, {
            name: program.name,
            path: program.path,
        });
    })
    .parse(process.argv);
