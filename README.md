<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Notification  🔥 🚀

This is a NestJS v9.x api to emulate a notification system, manipulating the notifications data through defined endpoints. No real notifications are dispatched, the application is just for controlling the notifications history.

The project was created for refinement of NestJS knowledge. It also work as a skills showcase.

## Build with

| Name       | Version  |
| ---------- | -------- |
| NestJs | v9.x |
| NodeJs | v19.8.x + |
| Typescript | v4.7.x + |
| NPM | v9.5.x + |
| Prisma | v4.15.x + |
| Docker | v20.10.x |
| Docker Compose | v3.8.x |
| Redis | v6.2.x |
| Mysql | v8.0.x |
| Postgresql | v12.x |
| MongoDB | v3.2.x |

## Objectives

* Use a Dockerized environment
* Use concepts of Repository Pattern
* Use concepts of SOLID
* Use concepts of Clean Architecture
* Use Prisma for database modelling and migration
* Use Data Transfer Objects (DTOs) to transport groups of data between the application layers and to validate input data
* Create tests for the application using JEST

## Docs

* [Getting Started](./docs/getting_started.md)
* [Folder Structure](./docs/folder_structure.md)
* [Api Versioning](./docs/api_versioning.md)
* [About Prisma Schema](./docs/about_prisma_schema.md)
* [CORS](./docs/cors.md)
* [Available NPM Scripts](./docs/available_npm_scripts.md)
* [Available Make Scripts](./docs/available_make_scripts.md)

## Next Todo

Next development actions

* [X] Adjust dependencies import (tsconfig paths not working properly in jest tests)
* [X] Implement mappers (from Prisma to Entity, from Entity to Prisma)
* [X] Implement view models on the http layer
* [X] Implement create notification flow (controller, use-case, etc)
* [X] Implement cancel notification flow (controller, use-case, etc)
* [X] Implement read notification flow (controller, use-case, etc)
* [X] Implement unread notification flow (controller, use-case, etc)
* [X] Implement recipient received notifications count flow (controller, use-case, etc)
* [X] Implement recipient received notifications list flow (controller, use-case, etc)
* [X] Implement list all notifications flow (controller, use-case, etc)
* [X] Implement get specific notification flow (controller, use-case, etc)
* [X] Adding api name and api version to the endpoints
* [ ] Create and apply configurations files (Application, Api, Database, Redis)
* [ ] Saving counter of sent notifications on Redis
* [ ] Saving counter of read notifications on Redis
* [ ] Adjust jest tests for better performance
* [X] Implement health check route
* [ ] Finish documentation
