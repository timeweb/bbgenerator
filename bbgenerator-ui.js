const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const UIGenerator = require('./core/UIGenerator.js');

const init = () => {
    console.log(
        chalk.cyan(
            figlet.textSync('Backbone', {
                font: 'Stop',
                horizontalLayout: 'Flitted',
                verticalLayout: 'default',
            })
        )
    );
    console.log(
        chalk.cyan(
            figlet.textSync('Generator', {
                font: 'Stop',
                horizontalLayout: 'Flitted',
                verticalLayout: 'default',
            })
        )
    );
};

const success = ({ type, name }) => {
  console.log(chalk.white.bgGreen.bold(`Done! ${type} created at ${name}`));
};

const run =  async (entityName, options) => {
    init();
    const uiGenerator = new UIGenerator(options);
    await uiGenerator.run(entityName);
    
    console.log();
    success(uiGenerator.parentEntity);
};

program
    .usage('[options] <entityName>')
    .option('-t, --type [type]', 'Тип создаваемой сущности')
    .option('-p, --path [path]', 'Путь до папки c компонентом', process.cwd())
    .action(file => {
        run(typeof file === 'string' ? file : undefined, {
            path: program.path,
            type: program.type,
        });
    })
    .parse(process.argv);
