const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');
const ViewGenerator = require('./ViewGenerator.js');
const TemplateGenerator = require('./TemplateGenerator.js');
const ModelGenerator = require('./ModelGenerator.js');
const CollectionGenerator = require('./CollectionGenerator.js');
const CollectionViewGenerator = require('./CollectionViewGenerator.js');
const StyleGenerator = require('./StyleGenerator.js');

class ComponentGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'Component';
    }

    async generate() {
        const collectionGenerator = new CollectionGenerator(
            { ...this.options, name: this.options.collection },
            this.parentEntity
        );

        if (this.options.model && !this.options.collection) {
            const modelGenerator = new ModelGenerator({ ...this.options, name: this.options.model }, this.parentEntity);
            await modelGenerator.run();
        }

        if (this.options.collection) {
            await collectionGenerator.run();
        }

        if (this.options.itemView) {
            const collectionViewGenerator = new CollectionViewGenerator(this.options, this.parentEntity);
            await collectionViewGenerator.run();
        } else {
            const viewGenerator = new ViewGenerator(this.options, this.parentEntity);
            await viewGenerator.run();
        }

        const styleGenerator = new StyleGenerator(this.options, this.parentEntity);
        await styleGenerator.run();
    }
}

module.exports = ComponentGenerator;
