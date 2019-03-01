import CollectionGenerator from '../core/CollectionGenerator';

jest.mock('shelljs', () => ({ mkdir: jest.fn() }));
jest.mock('fs', () => ({ writeFileSync: jest.fn() }));

const fs = require('fs');

describe('CollectionGenerator', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
    });

    it('generate', async () => {
        // Arrange
        const path = './asdDss/AsdDssCollection.js';
        const body = `import Backbone from 'backbone';

export default class AsdDssCollection extends Backbone.Collection {
    initialize(attributes, options) { console.log('[AsdDssCollection]: initialize'); }
}
`;
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([path, body, { flag: 'w' }]);
    });

    it('generate with custom name', async () => {
        // Arrange
        const path = './asdDss/DddsCollection.js';
        const body = `import Backbone from 'backbone';

export default class DddsCollection extends Backbone.Collection {
    initialize(attributes, options) { console.log('[DddsCollection]: initialize'); }
}
`;
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', name: 'Ddds' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([path, body, { flag: 'w' }]);
    });

    it('generate with model', async () => {
        // Arrange
        const expectedModelArguments: string[] = [
            './asdDss/AsdDssModel.js',
            `import Backbone from 'backbone';

export default class AsdDssModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AsdDssModel]: initialize'); }
    validation = {};
}
`,
        ];
        const expectedCollectionArguments: string[] = [
            './asdDss/AsdDssCollection.js',
            `import Backbone from 'backbone';
import AsdDssModel from './AsdDssModel.js';

export default class AsdDssCollection extends Backbone.Collection {
    model = AsdDssModel;
    initialize(attributes, options) { console.log('[AsdDssCollection]: initialize'); }
}
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', model: true, name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
    });

    it('generate with custom name and model', async () => {
        // Arrange
        const expectedModelArguments: string[] = [
            './asdDss/DddsModel.js',
            `import Backbone from 'backbone';

export default class DddsModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[DddsModel]: initialize'); }
    validation = {};
}
`,
        ];
        const expectedCollectionArguments: string[] = [
            './asdDss/DddsCollection.js',
            `import Backbone from 'backbone';
import DddsModel from './DddsModel.js';

export default class DddsCollection extends Backbone.Collection {
    model = DddsModel;
    initialize(attributes, options) { console.log('[DddsCollection]: initialize'); }
}
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', model: true, name: 'Ddds' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
    });

    it('generate with custom name and custom model', async () => {
        // Arrange
        const expectedModelArguments: string[] = [
            './asdDss/AModel.js',
            `import Backbone from 'backbone';

export default class AModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[AModel]: initialize'); }
    validation = {};
}
`,
        ];
        const expectedCollectionArguments: string[] = [
            './asdDss/DddsCollection.js',
            `import Backbone from 'backbone';
import AModel from './AModel.js';

export default class DddsCollection extends Backbone.Collection {
    model = AModel;
    initialize(attributes, options) { console.log('[DddsCollection]: initialize'); }
}
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', model: 'A', name: 'Ddds' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
    });

    it('generate with custom model ', async () => {
        // Arrange
        const expectedModelArguments: string[] = [
            './asdDss/DddsModel.js',
            `import Backbone from 'backbone';

export default class DddsModel extends Backbone.Model {
    get defaults() {
        return {};
    }

    initialize(attributes, options) { console.log('[DddsModel]: initialize'); }
    validation = {};
}
`,
        ];
        const expectedCollectionArguments: string[] = [
            './asdDss/AsdDssCollection.js',
            `import Backbone from 'backbone';
import DddsModel from './DddsModel.js';

export default class AsdDssCollection extends Backbone.Collection {
    model = DddsModel;
    initialize(attributes, options) { console.log('[AsdDssCollection]: initialize'); }
}
`,
        ];
        const componentName: string = 'AsdDss';
        const gen: CollectionGenerator = new CollectionGenerator({ path: '.', model: 'Ddds', name: '' });

        // Act
        await gen.run(componentName);

        // Assert
        expect(fs.writeFileSync.mock.calls.length).toBe(2);
        expect(fs.writeFileSync.mock.calls[0]).toEqual([...expectedModelArguments, { flag: 'w' }]);
        expect(fs.writeFileSync.mock.calls[1]).toEqual([...expectedCollectionArguments, { flag: 'w' }]);
    });
});
