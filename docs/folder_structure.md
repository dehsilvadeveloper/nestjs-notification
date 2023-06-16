## Folder Structure

1. `/core` The core of the application where we put the logic and business rules.
2. `/infra` Everything that is external of the core of application, like controllers, routes, database related repositories and messaging consumers / publishers (RabbitMQ, Kafka, etc). This layer will consume the core layer.
3. `/shared` Everything that can be used for the whole application, like helpers and enums.
4. This a work in progress.