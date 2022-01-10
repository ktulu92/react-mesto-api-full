# Последняя версия проекта "Место"



## Что это?
Сайт, некоторое подобие Инстаграма. 
### Реализовано: 
+ Возможность добавлять карточки через всплывающее окно формы.
+ Возможность изменить аватар и имя пользователя. 
+ При нажатии на карточку открывается попап галереи в отдельном окне. 
+ Можно удалить свою карточку и поставить лайк.


## Используемые технологии
+ React.js (Хуки)
+ Валидная семантическая верстка HTML5, CSS3 использованы флексы и гриды(flex-box , grid-layot) 
+ В проекте используется объектно ориентированный подход JS. + Добавлена валидация форм через JS

+ Методология BEM Nested. + Настроена транспилляция Babel.js, PostCSS и сборка Webpack.js +  Добавлено взаимодействие API ( Информация о лайках, аватаре и данных пользователя отправляется на сервер. Добавление/удаление карточек так же происходит на сервере

Ссылка на макет https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1






# Сервер:

Директории
/public — статика, полученная в результате билда фронтенд-приложения на Реакте
/data — JSON-файлы для временной эмуляции работы с базой данных
/routes — папка с файлами роутера

Остальные директории вспомогательные, создаются при необходимости разработчиком

Запуск проекта
npm run start — запускает сервер
npm run dev — запускает сервер с hot-reload
