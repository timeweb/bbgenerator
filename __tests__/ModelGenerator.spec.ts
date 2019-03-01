import ModelGenerator from '../core/ModelGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('ModelGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const path = './asdDss/AsdDssModel.js';
        const body = `import Backbone from 'backbone';

export default class AsdDssModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AsdDssModel]: initialize'); }
    validation = {};
}
`;
        const componentName: string = 'AsdDss';
        const gen: ModelGenerator = new ModelGenerator({ path: '.', name: componentName });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([path, body, { flag: 'w' }]);
    });
});
