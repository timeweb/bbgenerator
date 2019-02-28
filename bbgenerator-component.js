const chalk = require('chalk');
const program = require('commander');
const ComponentGenerator = require('./core/ComponentGenerator.js');

const TYPE = 'Component';

const init = type => {
    console.log(chalk.blue(`Start ${type} creating:`));
};

const success = ({ type, name }) => {
    console.log(chalk.white.bgGreen.bold(`Done! ${type} created at ${name}`));
};

const run = async (entityName, options) => {
    init(TYPE);
    const gen = new ComponentGenerator(options);
    await gen.run(entityName);

    console.log();
    success(gen.parentEntity);
};

program
    .usage('[options] <componentName>')
    .option('-m, --model [name]', 'Добавить model')
    .option('-c, --collection [name]', 'Добавить collection')
    .option('-i, --item-view [name]', 'Создать CollectionView')
    .option('-p, --path [path]', 'Путь до папки в которой создавать', process.cwd())
    .action((file, op) => {
        run(typeof file === 'string' ? file : undefined, {
            model: program.model,
            collection: program.collection,
            path: program.path,
            itemView: program.itemView,
        });
    })
    .parse(process.argv);
