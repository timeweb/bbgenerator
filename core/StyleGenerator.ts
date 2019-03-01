import * as fabric from './fabric';
import Generator from './Generator';
import { OutputTemplateData } from './types';

export default class StyleGenerator extends Generator {
    type: string = 'Style';

    async generate(): Promise<void> {
        const templateData: OutputTemplateData = {
            name: <string>this.options.name,
            path: <string>this.options.path,
        };
        const data: OutputTemplateData = fabric.createStyle(this.entity, templateData);
        this.log(data);
    }
}
