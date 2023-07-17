## About Prisma Schema

### Actions after changes on Prisma schema

After changes are made on schema file of the Prisma (`prisma/schema.prisma`), its important to rebuild the docker containers. You can do this with the following script:

```shell
make build
```

This action is necessary because Docker may cache the containers content, making it impossible for the application to see the updated schema file.
