<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Stack

* Nest
* MongoDB

## Installation

1. Install dependencies
```bash
$ yarn install
```

2. Install Nest CLI globally
```bash
$ npm i -g @nestjs/cli
```

3. Start database
```bash
$ docker-compose up -d
```

4. Clone file __.env.template__ and rename it to __.env__

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Production build

1. Create file __.env.prod__
2. Assign values to the environment variables
3. Create new image
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```