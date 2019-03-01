import TemplateGenerator from '../core/TemplateGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('TemplateGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const path = './asdDss/asdDss.hbs';
        const body = '<b>template for AsdDss</b>';
        const componentName: string = 'AsdDss';
        const gen: TemplateGenerator = new TemplateGenerator({ path: '.', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([path, body, { flag: 'w' }]);
    });
});
