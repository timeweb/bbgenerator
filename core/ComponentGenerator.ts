import Generator from './Generator';
import ViewGenerator from './ViewGenerator';
import ModelGenerator from './ModelGenerator';
import CollectionGenerator from './CollectionGenerator';
import CollectionViewGenerator from './CollectionViewGenerator';
import StyleGenerator from './StyleGenerator';

export default class ComponentGenerator extends Generator {
    type: string = 'Component';

    async generate(): Promise<void> {
        const collectionGenerator: CollectionGenerator = new CollectionGenerator(
            { ...this.options, name: typeof this.options.collection === 'string' ? this.options.collection : this.options.name },
            this.entity
        );

        if (this.options.model && !this.options.collection) {
            const modelGenerator: ModelGenerator = new ModelGenerator(
                { ...this.options, name: typeof this.options.model === 'string' ? this.options.model : this.options.name },
                this.entity
            );
            await modelGenerator.run();
        }

        if (this.options.collection) {
            await collectionGenerator.run();
        }

        if (this.options.itemView) {
            const collectionViewGenerator: CollectionViewGenerator = new CollectionViewGenerator(
                this.options,
                this.entity
            );
            await collectionViewGenerator.run();
        } else {
            const viewGenerator: ViewGenerator = new ViewGenerator(this.options, this.entity);
            await viewGenerator.run();
        }

        const styleGenerator: StyleGenerator = new StyleGenerator(this.options, this.entity);
        await styleGenerator.run();
    }
}
