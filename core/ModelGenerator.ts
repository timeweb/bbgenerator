import * as fabric from './fabric';
import GenerationEntity from './GenerationEntity';
import Generator from './Generator';
import { OutputTemplateData } from './types';

export default class ModelGenerator extends Generator {
    type: string = 'Model';

    getName() {
        const name = this.options.name.length ? GenerationEntity.create(this.options.name).name : this.rootEntity.name;
        return name + 'Model';
    }

    async generate(): Promise<void> {
        const templateData: OutputTemplateData = {
            name: <string>this.options.name,
            path: <string>this.options.path,
        };
        const data: OutputTemplateData = fabric.createModel(this.entity, templateData);
        this.log(data);
    }
}
