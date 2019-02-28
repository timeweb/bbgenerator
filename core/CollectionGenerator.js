const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');
const ModelGenerator = require('./ModelGenerator.js');

class CollectionGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'Collection';
    }

    getName() {
        const name =
            typeof this.options.name === 'string' ? Entity.create(this.options.name).name : this.parentEntity.name;
        return name + 'Collection';
    }

    async generate() {
        let modelName;
        if (this.options.model) {
            const modelGenerator = new ModelGenerator({ ...this.options, name: this.options.model }, this.parentEntity);
            await modelGenerator.run();
            modelName = modelGenerator.entity.name;
        }
        const data = fabric.createCollection(this.entity, this.options, modelName);
        this.log(data);
        return data;
    }
}

module.exports = CollectionGenerator;
