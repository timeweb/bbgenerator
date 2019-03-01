import ViewGenerator from '../core/ViewGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('ViewGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const expectedTemplateArguments: string[] = [
            './asdDss/asdDss.hbs',
            `<b>template for AsdDss</b>`,
        ];
        const expectedViewArguments: string[] = [
            './asdDss/AsdDss.js',
            `import { View } from 'backbone.marionette';
import asdDssTemplate from './asdDss.hbs';

const AsdDss = View.extend({
    className: 'asd-dss',
    template: asdDssTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[AsdDss]: initialize') },
    onRender() { console.log('[AsdDss]: onRender') },
});

export default AsdDss;
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: ViewGenerator = new ViewGenerator({ path: '.', model: true, name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedViewArguments, { flag: 'w' }]);
    });

    it('generate with custom name ', async () => {
        // Arrange
        const expectedTemplateArguments: string[] = [
            './asdDss/ddds.hbs',
            `<b>template for Ddds</b>`,
        ];
        const expectedViewArguments: string[] = [
            './asdDss/Ddds.js',
            `import { View } from 'backbone.marionette';
import dddsTemplate from './ddds.hbs';

const Ddds = View.extend({
    className: 'asd-dss__ddds',
    template: dddsTemplate,
    ui: {},
    events: {},
    regions: {},
    initialize() { console.log('[Ddds]: initialize') },
    onRender() { console.log('[Ddds]: onRender') },
});

export default Ddds;
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: ViewGenerator = new ViewGenerator({ path: '.', name: 'Ddds' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedTemplateArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedViewArguments, { flag: 'w' }]);
    });
});
