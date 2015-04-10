# SPAREPART

Инструмент для формирования синтаксического дерева из некоторой файловой структуры. Подходит для анализа проекта, который использует методологию, базирующуюся на файловой структуре. Например, БЭМ :-)

## Использование

Анализ проходит в два этапа:
- Получение файловой структуры некоторой директории в виде синтаксического дерева.
- Преобразование полученной структуры по определенным правилам в новое синтаксическое дерево, которое можно использовать в других проектах.

Сами правила представляют цепочки функций, которые применяются к каждому узлу (файлу/папке) при обходе исходного дерева.

TODO: реализовать второй шаг :)

## Пример

Содержимое папки *my-pet-project*:

```bash
my-pet-project/
  node_modules/
    sparepart/
      index.js
  .gitignore
  index.js
```

```javascript
var path = require('path');
var sp = require('sparepart');

var directory = path.resolve('my-pet-project');

sp(directory, function (err, tree) {
  console.log(tree);
});
```

Полученное дерево:

```json
{
  "my-pet-project/node_modules": {
    "my-pet-project/node_modules/sparepart": {
      "my-pet-project/node_modules/sparepart/index.js": null
    }
  },
  "my-pet-project/.gitignore": null,
  "my-pet-project/index.js": null
}
```
