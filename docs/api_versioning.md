## Api Versioning

The api has been built with version information as part of the url.

`localhost:3333/api/v1`

The **v1** is equivalent to the api version. This provides an alternative way to organize your endpoints.

### Setting version on controllers

You can set the version of the api on each method of the controllers using the decorator **@Version**. See the following example:

```php
@Controller('notifications')
export class NotificationController {
    @Version('1')
    @Get('getAll')
    list(): void {}

    @Version('2')
    @get('getAll')
    listWithTrashed(): void {}
}
```

The application will look at the version present on the decorator and only use the methods that match the version of the url requested. 

So if we have a request to `GET localhost:3333/api/v1/notifications/getAll` the method *list()* will be called. Otherwise, if we have a request to `GET localhost:3333/api/v2/notifications/getAll` the method *listWithTrashed()* will be called.

It is also possible to set a version to the whole controller, like the following example:

```php
@Controller({
  version: '1',
})
export class NotificationController {
  @Post()
  create(): void {}

  @Put()
  edit(): void {}
}
```

If you structure your controller like in the example, all methods within him will get the version defined on the decorator **@Controller**.

### Defining default version

You can use the environment variable `API_DEFAULT_VERSION` to set the default api version, something like this:

```
API_DEFAULT_VERSION=2
```
For the sake of a example, lets assume that the following endpoint was requested:

`localhost:3333/api/notifications`

That example means that, if no version is informed on the endpoint, the application will assume that the version that should be considered is the version 2 and will look for controllers and controllers methods that match that criteria.
