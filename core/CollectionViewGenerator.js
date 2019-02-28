const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');
const ViewGenerator = require('./ViewGenerator');
const TemplateGenerator = require('./TemplateGenerator');

class CollectionViewGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'CollectionView';
    }

    getName() {
        const name =
            typeof this.options.name === 'string' ? Entity.create(this.options.name).name : this.parentEntity.name;
        return name;
    }

    async generate() {
        const viewGenerator = new ViewGenerator(
            { ...this.options, name: this.parentEntity.name + 'ItemView' },
            this.parentEntity
        );
        await viewGenerator.run();


        const templateGenerator = new TemplateGenerator(this.options, this.parentEntity);
        await templateGenerator.init();
        templateGenerator.generate(this.entity.name);

        const data = fabric.createCollectionView(this.entity, this.options, viewGenerator.entity.name);
        this.log(data);
        return data;
    }
}

module.exports = CollectionViewGenerator;
