const chalk = require('chalk');
const program = require('commander');
const CollectionGenerator = require('./core/CollectionGenerator.js');

const TYPE = 'Collection';

const init = type => {
    console.log(chalk.blue(`Start ${type} creating:`));
};

const success = ({ type, name }) => {
    console.log(chalk.white.bgGreen.bold(`Done! ${type} created at ${name}`));
};

const run = async (entityName, options) => {
    init(TYPE);
    const gen = new CollectionGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.parentEntity);
};

program
    .usage('[options] <componentName>')
    .option('-n, --name [name]', 'Имя коллекции')
    .option('-m, --model [name]', 'Нужно ли создавать модель')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action((file, op) => {
        run(typeof file === 'string' ? file : undefined, {
            name: program.name,
            model: program.model,
            path: program.path,
        });
    })
    .parse(process.argv);
