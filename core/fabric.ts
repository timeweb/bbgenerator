import fs from 'fs';
import shell from 'shelljs';
import * as template from './templates';
import GenerationEntity from './GenerationEntity';
import { OutputTemplateData, InputTemplateData, InputCollectionViewTemplateData } from './types';

function createFile(dir: string, filename: string, extension: string, body: string): string {
    shell.mkdir('-p', dir);
    const filePath: string = `${dir}/${filename}.${extension}`;
    fs.writeFileSync(filePath, body, { flag: 'w' });
    return filePath;
}

function generateClassName(entityName: string, customName?: string): string {
    let entityClass = entityName;
    if (customName) {
        customName = customName[0].toLowerCase() + customName.substring(1);
        entityClass += `__${customName}`;
    }
    return entityClass.replace(/\.?([A-Z])/g, (x, y) => '-' + y.toLowerCase()).replace(/^_/, '');
}

/**
 * CREATE VIEW
 */
export function createView({ folderName, name }: GenerationEntity, tData: InputTemplateData): OutputTemplateData {
    const className: string = generateClassName(folderName, tData.name);
    const nameData: GenerationEntity = GenerationEntity.create(name, '');
    const body: string = template.view(name, nameData.folderName, className);
    const filePath: string = createFile(`${tData.path}/${folderName}`, name, 'js', body);
    return { path: filePath, name, folder: folderName, type: 'View' };
}

/**
 * CREATE COLLECTION VIEW
 */
export function createCollectionView(
    { folderName, name }: GenerationEntity,
    tData: InputCollectionViewTemplateData
): OutputTemplateData {
    const className: string = generateClassName(folderName, tData.name);
    const nameData: GenerationEntity = GenerationEntity.create(name, '');
    const body: string = template.collectionView(name, nameData.folderName, className, <string>tData.childViewName);
    const filePath: string = createFile(`${tData.path}/${folderName}`, name, 'js', body);
    return { path: filePath, name, folder: folderName, type: 'CollectionView' };
}

/**
 * CREATE MODEL
 */
export function createModel({ folderName, name }: GenerationEntity, { path }: InputTemplateData): OutputTemplateData {
    const body: string = template.model(name);
    const filePath: string = createFile(`${path}/${folderName}`, name, 'js', body);
    return { path: filePath, name, folder: folderName, type: 'Model' };
}

/**
 * CREATE COLLECTION
 */
export function createCollection({ folderName, name }: GenerationEntity, { path, name: modelName }: InputTemplateData): OutputTemplateData {
    const body: string = template.collection(name, <string>modelName);
    const filePath: string = createFile(`${path}/${folderName}`, name, 'js', body);
    return { path: filePath, name, folder: folderName, type: 'Collection' };
}

/**
 * CREATE TEMPLATE
 */
export function createTemplate({ folderName, name }: GenerationEntity, templateData: InputTemplateData): OutputTemplateData {
    return {
        path: createFile(`${templateData.path}/${folderName}`, name, 'hbs', `<b>template for ${templateData.name}</b>`),
        name,
        folder: folderName,
        type: 'Template',
    };
}

/**
 * CREATE STYLE
 */
export function createStyle({ folderName }: GenerationEntity, { path }: InputTemplateData): OutputTemplateData {
    const className: string = generateClassName(folderName);
    return {
        path: createFile(`${path}/${folderName}`, folderName, 'scss', `.${className} {}`),
        name: folderName,
        folder: folderName,
        type: 'Style',
    };
}
