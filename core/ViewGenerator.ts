import * as fabric from './fabric';
import GenerationEntity from './GenerationEntity';
import Generator from './Generator';
import TemplateGenerator from './TemplateGenerator';
import { OutputTemplateData } from './types';

export default class ViewGenerator extends Generator {
    type: string = 'View';

    getName() {
        const name: string = this.options.name.length ? GenerationEntity.create(this.options.name).name : this.rootEntity.name;
        return name;
    }

    async generate(): Promise<void> {
        console.log(this.options, this.rootEntity, this.entity);
        const templateGenerator: TemplateGenerator = new TemplateGenerator(
            { ...this.options, name: this.getName() },
            this.entity
        );
        await templateGenerator.init();
        templateGenerator.generate();

        const templateData: OutputTemplateData = {
            name: this.options.name.length ? <string>this.entity.name : '',
            path: <string>this.options.path,
        };

        const data: OutputTemplateData = fabric.createView(this.entity, templateData);
        this.log(data);
    }
}
