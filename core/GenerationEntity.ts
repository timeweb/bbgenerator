export default class GenerationEntity implements IEntity {
    folderName: string;
    name: string;
    type: string;

    constructor({ folderName = '', name = '', type = 'Entity'}: IEntity) {
        this.folderName = folderName;
        this.name = name;
        this.type = type;
    }

    static create(name: string, type: string = 'Entity'): GenerationEntity {
        return new GenerationEntity({
            folderName: name.length ? name[0].toLowerCase() + name.substring(1) : '',
            name: name.length ? name[0].toUpperCase() + name.substring(1) : '',
            type,
        });
    }
}

export interface IEntity {
    folderName: string;
    name: string;
    type: string;
}