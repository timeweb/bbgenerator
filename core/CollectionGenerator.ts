import * as fabric from './fabric';
import GenerationEntity from './GenerationEntity';
import Generator from './Generator';
import ModelGenerator from './ModelGenerator';
import { OutputTemplateData } from './types';

export default class CollectionGenerator extends Generator {
    type: string = 'Collection';

    getName() {
        const name: string = this.options.name.length ? GenerationEntity.create(this.options.name).name : this.rootEntity.name;
        return name + 'Collection';
    }

    async generate(): Promise<void> {
        let modelName = '';
        if (this.options.model) {
            const modelGenerator = new ModelGenerator(
                { ...this.options, name: typeof this.options.model === 'string' ? this.options.model : this.options.name },
                this.rootEntity
            );
            await modelGenerator.run();
            modelName = modelGenerator.entity.name;
        }
        const templateData: OutputTemplateData = {
            name: modelName,
            path: <string>this.options.path,
        };
        const data = fabric.createCollection(this.entity, templateData);
        this.log(data);
    }
}
