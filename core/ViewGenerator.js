const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');
const TemplateGenerator = require('./TemplateGenerator');

class ViewGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'View';
    }

    getName() {
        const name =
            typeof this.options.name === 'string' ? Entity.create(this.options.name).name : this.parentEntity.name;
        return name;
    }

    async generate() {
        const templateGenerator = new TemplateGenerator(this.options, this.parentEntity);
        await templateGenerator.init();
        templateGenerator.generate(this.entity.name);
        
        const data = fabric.createView(this.entity, this.options);
        this.log(data);
        return data;
    }
}

module.exports = ViewGenerator;
