![img.png](github/images/ph.jpg)

## Description

Backend Application for Event Board Project

## Installation

**Подтянуть себе проект:**
```bash
# используя SSH (рекомендуется)
$ git clone git@github.com:ivankrtv/event-board-api.git

# используя http
$ git clone https://github.com/ivankrtv/event-board-api.git
```

**Загрузка пакетов:**
```bash
$ cd event-board-api
$ npm ci
```

Следует обратить внимание, что следует использовать именно команду `npm ci` вместо `npm install` чтобы не 
перезаписывать `package-lock.json` 

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
```

## Rabbit MQ
Установку Rabbit лучше проводить в качестве запуска докер-контейнера
([Docker rabbitmq doc](https://hub.docker.com/_/rabbitmq))

**_(Устанавливать его не обязательно, если вы не работаете/не будете работать с очередями)_**

```bash
$ docker pull rabbitmq
$ docker run --name some-rabbit -p 5672:5672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3
```

**В качестве названия контейнера, имени пользователя, пароля и порта вы можете поставить любые сови значения, 
которые потом необходимо внести в энвы по шаблону выше** 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
`
