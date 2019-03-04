# bbgenerator
Backbone-Marionette Component Generator

![node](https://img.shields.io/node/v/bbgenerator.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ineigo/bbgenerator.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/ineigo/bbgenerator.svg)

## Install 
`npm i -g bbgenerator`

## Using
После установки появится команда `bbgenerator`.

### bbgenerator

Запускает интерфейс создания компонента. \
Посмотреть все команды можно так `bbgenerator -h`. \
И для каждой команды доступно: `bbgenerator <comandName> -h`.

### bbgenrator component \<nameComponent\> [options]

Создает от текущей дериктории папку `nameComponent` c такой структурой:
- **nameComponent.hbs** - шаблон
- **NameComponent.js** - Marionette View с подключенным шаблоном
- **nameComponent.scss** - стили

Опциями можно добавить:
- **-i, --item-view** - Сгенерирует `CollectionView`:
    - *NameComponent.js* - CollectionView
    - *nameComponent.hbs* - шаблон
    - *NameComponentItemView.js* - подключенная `childView`
    - *nameComponentItemView.hbs* - шаблон
- **-m, --model** - модель
    - *NameComponentModel.js*
- **-c, --collection** - коллекция
    - *NameComponentCollection.js*
- **-p, --path** - путь до папки с компонентом

При использовании двух флагов одновременно `-mc` в коллекцию подключится модель.