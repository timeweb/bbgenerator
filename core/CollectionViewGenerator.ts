import * as fabric from './fabric';
import GenerationEntity from './GenerationEntity';
import Generator from './Generator';
import ViewGenerator from './ViewGenerator';
import TemplateGenerator from './TemplateGenerator';
import { InputCollectionViewTemplateData } from './types';

export default class CollectionViewGenerator extends Generator {
    type: string = 'CollectionView';

    getName() {
        const name = this.options.name.length ? GenerationEntity.create(this.options.name).name : this.rootEntity.name;
        return name;
    }

    async generate(): Promise<void> {
        const viewGenerator = new ViewGenerator(
            { ...this.options, name: this.entity.name + 'ItemView' },
            this.entity
        );
        await viewGenerator.run();

        const templateGenerator: TemplateGenerator = new TemplateGenerator(
            { ...this.options, name: this.entity.name },
            this.entity
        );
        await templateGenerator.init();
        templateGenerator.generate();

        const templateData: InputCollectionViewTemplateData = {
            name: this.options.name ? this.entity.name : '',
            childViewName: viewGenerator.entity.name || <string>this.options.name,
            path: <string>this.options.path,
        };

        const data = fabric.createCollectionView(this.entity, templateData);
        this.log(data);
    }
}
