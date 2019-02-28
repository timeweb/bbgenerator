class Entity {
    constructor({ folderName = '', name = '', type = ''}) {
        this.folderName = folderName;
        this.name = name;
        this.type = type;
    }

    static create(name, type) {
        return new Entity({
            folderName: name[0].toLowerCase() + name.substring(1),
            name: name[0].toUpperCase() + name.substring(1),
            type,
        });
    }
}

module.exports = Entity;