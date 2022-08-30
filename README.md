[![Tests](https://github.com/eoneof-yap/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/eoneof-yap/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/eoneof-yap/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/eoneof-yap/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

> Тринадцатая учебная проектная работа Яндекс.Практикума

## Описание

Бэкенд для [предыдущей работы](https://github.com/eoneof-yap/mesto-react-auth).

## Цели

- научится работать со стеком Node.js + Express + MongoDB
- научится обрабатывать запросы к серверу, в том числе ошибочные

## Задачи

Написать полностью рабочий сервер, который может получать, сохранять и отправлять различные данные в формате `json`.

## Инструменты и технологии

- Node.js
- Express
- MongoDB
- mongoose

## API

| Метод  | Роут                 | Описание                                  |
| ------ | -------------------- | ----------------------------------------- |
| GET    | /users               | Возвращает всех пользователей             |
| GET    | /users/:userID       | Возвращает пользователя по идентификатору |
| POST   | /users               | Создает пользователя                      |
| PATCH  | users/me             | Обвляет профиль                           |
| PATCH  | users/me/avatar      | Обновляет аватар                          |
| GET    | /cards               | Возвращает все карточки                   |
| POST   | /cards               | Создает карточку                          |
| DELETE | /cards/:cardId       | удаляет карточку по идентификатору        |
| PUT    | /cards/:cardId/likes | поставить лайк                            |
| DELETE | /cards/:cardId/likes | убрать лайк с карточки                    |
