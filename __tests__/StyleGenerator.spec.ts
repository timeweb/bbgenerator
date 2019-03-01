import StyleGenerator from '../core/StyleGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('StyleGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const path = './asdDss/asdDss.scss';
        const body = '.asd-dss {}';
        const componentName: string = 'AsdDss';
        const gen: StyleGenerator = new StyleGenerator({ path: '.', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([path, body, { flag: 'w' }]);
    });
});
