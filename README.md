![img.png](.github/images/ph.jpg)

## Description

Backend Application for Event Board Project

## Navigation
1. [Installation](https://github.com/ivankrtv/event-board-api#installation)
2. [Database installation (postgres)](https://github.com/ivankrtv/event-board-api#database-installation-postgres)
3. [Environments](https://github.com/ivankrtv/event-board-api#environments)
4. [Rabbit MQ installation](https://github.com/ivankrtv/event-board-api#rabbit-mq)
5. [File structure of project](https://github.com/ivankrtv/event-board-api#file-structure)
6. [Running the app](https://github.com/ivankrtv/event-board-api#running-the-app)

## Installation

### Подтянуть себе проект:
```bash
# используя SSH (рекомендуется)
$ git clone git@github.com:ivankrtv/event-board-api.git

# используя http
$ git clone https://github.com/ivankrtv/event-board-api.git
```

### Запуск через docker-compose
Чтобы запустить приложение, после клонирования этого репозитория, вам нужно убедиться, что вы указали все env 
переменные в [.env файле](https://github.com/ivankrtv/event-board-api#environments) в корне проекта.

После этого достаточно запустить docker-compose и он поднимет вам приложение.

Запускать можно либо через свою IDE, либо командой, **находясь в корне проекта**
```bash
$ docker compose up
```

### Загрузка пакетов:
```bash
$ cd event-board-api
$ npm ci
```

Следует обратить внимание, что следует использовать именно команду `npm ci` вместо `npm install` чтобы не 
перезаписывать `package-lock.json` 

### Развертывание БД:

После успешного подключения к БД, чтобы у вас появились все нужные таблицы и связи необходимо запустить миграции
```bash
$ npm run migration:run
```

## Environments
```dotenv
# Database settings
DB_HOSTNAME=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# Hash settings
# Количество раундов хэширования (по дефолту 10)
HASH_SALT_ROUNDS=10

# Rabbit settings
RABBIT_USERNAME=
RABBIT_PASSWORD=
RABBIT_HOST=
RABBIT_PORT=
RABBIT_QUEUE_NAME=

# JWT
# В качестве секрета можно использовать любую строку
JWT_ACCESS_SECRET=
# Время жизни в секундах (для удобства разработки у себя 
# можно поставить занчение побольше, чтобы каждый раз не обращатсья к /refresh)
JWT_ACCESS_EXPIRES_IN=

# То же самое только для refresh токена
JWT_REFRESH_SECRET=
# Время жизни в секундах
JWT_REFRESH_EXPIRES_IN=2592000

# IUS
# (IUS - image-upload-s3, сервис загрузки изображений)
# параметры JWT для IUS (параметры должны совпадать с соответствующими настройками у сервиса)
IUS_JWT_SECRET=
IUS_JWT_EXPIRES_IN=900
```

## Database installation (postgres)

Предоставлена будет только установка в виде докер-контейнера, в случае если используется локальная БД, 
подразумевается, что разработчик сможет самостоятельно создать и настроить БД для проекта

```bash
$ docker pull postgres
$ docker run --name event-board-pg -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password postgres
```
**В качестве названия контейнера, имени пользователя, пароля и порта вы можете поставить любые свои значения,
которые потом необходимо внести в энвы по шаблону выше**

## Rabbit MQ
Установку Rabbit лучше проводить в качестве запуска докер-контейнера
([Docker rabbitmq doc](https://hub.docker.com/_/rabbitmq))

**_(Устанавливать его не обязательно, если вы не работаете/не будете работать с очередями)_**

```bash
$ docker pull rabbitmq
$ docker run --name some-rabbit -p 5672:5672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3
```

**В качестве названия контейнера, имени пользователя, пароля и порта вы можете поставить любые свои значения, 
которые потом необходимо внести в энвы по шаблону выше** 


## File structure

```
src
 --application (В этой директорий хранится все, что связано с HTTP взамодействием приложения)
   --controllers
   --decorators 
   --DTO
 --domain (директория хранит все, что свзяано с бизнес логикой (модели, классы с бизнесс логикой и т.д.))
   --events
   --participants
   --users
 --enums
 --infrastructure (директория хранит весь инфраструктурный код (работа с БД, с очередями, внешними сервисами и т.д.))
   --repositories
   --*.workers
 --mirations (Хранит все миграции БД)
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
