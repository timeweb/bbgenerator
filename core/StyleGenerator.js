const fabric = require('./fabric.js');
const Entity = require('./Entity.js');
const IGenerator = require('./IGenerator.js');

class StyleGenerator extends IGenerator {
    constructor(...args) {
        super(...args);
        this.type = 'Style';
    }

    generate() {
        const data = fabric.createStyle(this.entity, this.options);
        this.log(data);
        return data;
    }
}

module.exports = StyleGenerator;
