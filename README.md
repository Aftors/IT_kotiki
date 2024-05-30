# Проект команды IT-kotiki

## Демонстрационные видео

### Отчет 5 - 6 спринт

<https://disk.yandex.ru/i/qtgqCdP26QUTvQ>

### Отчет 7 - 8 спринт

<https://disk.yandex.ru/i/NKtdzD_mFXUtYQ>

## Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. На клиентской части выполнить команду ```npm run build``` - соберутся два билда, клиентский и SSR
4. На клиентской части выполнить команду ```npm link```
5. На серверной части добавить пакет ```npm run link 'client'```
6. На серверной части DEV режим ```npm run dev``` PROD режим ```npm run prod```
7. Задайте переменные окружения (пример в .env.sample)
8. Соберите образы командой ```docker-compose build```
9. Запустите сервисы командой ```docker-compose up```

## Production окружение в докере

`docker compose up` - запустит три сервиса:

1. prakticum-server, раздающий клиентскую статику (client)
2. prakticum-postgres с базой данных для API форума
3. prakticum-pgadmin с утилитой pgAdmin для работы с базой данных

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Forum API
Документация к API форума в виде [postman коллекции](https://www.postman.com/auddax/workspace/it-kotiki/collection/22362528-9571e374-7ccd-4792-844f-3d764b05b77e)

## Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```

## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

## Линтинг

```yarn lint```

## Форматирование prettier

```yarn format```
