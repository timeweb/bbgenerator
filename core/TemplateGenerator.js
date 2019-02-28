const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');

class TemplateGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'Template';
    }
    
    getName() {
        const name =
            typeof this.options.name === 'string' ? Entity.create(this.options.name).folderName : this.parentEntity.folderName;
        return name;
    }

    generate(parentName) {
        const data = fabric.createTemplate(this.entity, this.options, parentName);
        this.log(data);
        return data;
    }
}

module.exports = TemplateGenerator;
