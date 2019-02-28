const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');

class ModelGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'Model';
    }

    getName() {
        const name =
            typeof this.options.name === 'string' ? Entity.create(this.options.name).name : this.parentEntity.name;
        return name + 'Model';
    }
    
    generate() {
        const data = fabric.createModel(this.entity, this.options);
        this.log(data);
        return data;
    }
}

module.exports = ModelGenerator;
