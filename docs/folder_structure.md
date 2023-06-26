## Folder Structure

1. `/core` The core of the application where we put the logic and business rules.
2. `/infra` Everything that is external of the core of application, like controllers, routes, database related repositories and messaging consumers / publishers (RabbitMQ, Kafka, etc). This layer will consume the core layer.
    1. `/http` Everything related to http layer.
       1. `/controllers` Folder for the applications controllers.
       2. `/dtos` Folder for the data transfer objects.
       3. `/view-models` Folder for the mappers used to format data presented on the http layer.
3. `/shared` Everything that can be used for the whole application, like helpers and enums.
4. This a work in progress.