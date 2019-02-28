const fs = require('fs');
const shell = require('shelljs');
const template = require('./templates.js');
const Entity = require('./Entity.js');

const createFile = (dir, filename, extension, body) => {
    shell.mkdir('-p', dir);
    const filePath = `${dir}/${filename}.${extension}`;
    fs.writeFileSync(filePath, body, { flag: 'w' });
    return filePath;
};

const generateClassName = etityName =>
    etityName.replace(/\.?([A-Z])/g, (x, y) => '-' + y.toLowerCase()).replace(/^_/, '');

/**
 * CREATE VIEW
 */
module.exports.createView = ({ folderName, name }, { path }) => {
    const className = generateClassName(folderName);
    const nameData = Entity.create(name, '');
    const templateView = template.view(name, nameData.folderName, className);
    const filePath = createFile(`${path}/${folderName}`, name, 'js', templateView);
    return { path: filePath, name, folder: folderName, type: 'View' };
};

/**
 * CREATE COLLECTION VIEW
 */
module.exports.createCollectionView = ({ folderName, name }, { path }, childViewName) => {
    const className = generateClassName(folderName);
    const nameData = Entity.create(name, '');
    const templateView = template.collectionView(name, nameData.folderName, className, childViewName);
    const filePath = createFile(`${path}/${folderName}`, name, 'js', templateView);
    return { path: filePath, name, folder: folderName, type: 'CollectionView' };
};

/**
 * CREATE MODEL
 */
module.exports.createModel = ({ folderName, name }, { path }) => {
    // console.log(arguments[1])
    const templateView = template.model(name, folderName);
    const filePath = createFile(`${path}/${folderName}`, name, 'js', templateView);
    return { path: filePath, name, folder: folderName, type: 'Model' };
};

/**
 * CREATE COLLECTION
 */
module.exports.createCollection = ({ folderName, name }, { path }, modelName) => {
    const templateView = template.collection(name, modelName);
    const filePath = createFile(`${path}/${folderName}`, name, 'js', templateView);
    return { path: filePath, name, folder: folderName, type: 'Collection' };
};

/**
 * CREATE TEMPLATE
 */
module.exports.createTemplate = ({ folderName, name }, { path }, parentName = 'Ohh!') => {
    return {
        path: createFile(`${path}/${folderName}`, name, 'hbs', `<b>template for ${parentName}</b>`),
        name,
        folder: folderName,
        type: 'Template',
    };
};

/**
 * CREATE STYLE
 */
module.exports.createStyle = ({ folderName, name }, { path }) => {
    const className = generateClassName(folderName);
    return {
        path: createFile(`${path}/${folderName}`, folderName, 'scss', `.${className} {}`),
        name: folderName,
        folder: folderName,
        type: 'Style',
    };
};
