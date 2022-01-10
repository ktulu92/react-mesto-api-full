# Последняя версия проекта "Место"



## Что это?
Сайт, некоторое подобие Инстаграма. После регистрации и авторизации проект позволяет загружать карточки с названием и изображением через всплывающую форму.
Можно просматривать изображения в окне галереи при клике на карточку. Есть возможность поставить лайк и удалить свою карточку.

### Реализовано: 
+ Адаптивность под основные разрешения через медиа запросы (media queries break points)
+ Возможность добавлять карточки через всплывающее окно формы.
+ Валидация всех форм
+ Возможность изменить аватар и имя пользователя. 
+ При нажатии на карточку открывается попап галереи в отдельном окне. 
+ Можно удалить свою карточку и поставить лайк.
+ Регистрацияяя и авторизация для пользователей через jwt токен


## Используемые технологии
**На клиенте**
+ Семантическяа верстка HTML5, CSS3(flex-box,grid-layout)
+ Именование классов по методологии  BEM Nested.
+ Верстка адаптирована через media queries breakpoints под различные устройства ( поддерживается разрешение экрана от 320 до 1280 и более пикселей по ширине)
+ Фронтенд - React, функциональные компоненты.
+ Логика - JavaScript ES6 (объектно-ориентированный и функциональный подходы, async/await, fetch API).
+ Функции Context, Ref, Redirect, Route, Switch.
+ Хуки useState, useEffect, useContext, useRef, useCallback, useHistory.
+ Использован ESLint в конфигурации airbnb-base.

**На сервере** 
+ Node.js(Express.js.)
+ Реализован REST API для работы с базой данных, аутентификации и авторизации пользователя.
+ Работа с данными - MongoDB, использование schema, CRUD-операций. Для работы с Node.js использован Mongoose.
+ Применена валидация пользовательских данных на стороне клиента и на стороне пользователя (в том числе с помощью модулей validator, joi/celebrate).
+ Для авторизации используется JWT-токен.
+ Ведутся логи доступа и ошибок при помощи модуля winston.
+ Реализована централизованная обработка ошибок с отправкой корректных статусов и сообщений о ошибках на запросы.


Ссылка на макет https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1

*Запуск клиента :*
+ npm install
Чтобы установить зависимости
+ npm start
Чтобы запустить приложение по адресу: http://localhost:3000
npm run build Чтобы получить итоговую сборку

*Запуск сервера: *
+ npm run start — запускает сервер
+ npm run dev — запускает сервер с hot-reload
