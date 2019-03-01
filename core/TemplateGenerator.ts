import * as fabric from './fabric';
import GenerationEntity from './GenerationEntity';
import Generator from './Generator';
import { OutputTemplateData } from './types';

export default class TemplateGenerator extends Generator {
    type: string = 'Template';

    getName() {
        const name: string = this.options.name.length
            ? GenerationEntity.create(this.options.name, this.type).folderName
            : this.rootEntity.folderName;
        return name;
    }

    async generate(): Promise<void> {
        const templateData: OutputTemplateData = {
            name: <string>this.rootEntity.name,
            path: <string>this.options.path,
        };
        const data: OutputTemplateData = fabric.createTemplate(this.entity, templateData);
        this.log(data);
    }
}
