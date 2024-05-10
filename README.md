<h1 align="center">Finboost Back-End</h1>
<p align="center">This repository is the backend for a mobile application that aims to provide various features such as authentication, chat, and more. This backend is built using Express.js, Prisma, MySQL (Cloud SQL), Zod, JWT, Docker, OpenAPI, GitHub Acitons, Cloud Run, and Cloud Storage</p>

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture File and Folder](#architecture-file-and-folder)
- [Prisma Cheatsheet](#prisma-cheatsheet)

## Tech Stack

- [Express.js](https://expressjs.com) (`Framework`): Minimal and flexible Node.js web application framework that provides robust set of features for web and mobile applications. APIs.
- [Prisma](https://www.prisma.io) (`ORM`): Let your team ship features faster, and leave the database complexities to us (orm, schema, introspection, migration, seeding, studio).
- [MySQL](https://www.mysql.com) (`Database`): Is an open-source relational database management system.
- [PostgreSQL](https://www.postgresql.org) (`Database`): PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.
- [Zod](https://zod.dev) (`Validation`): Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple `string` to a complex nested object. Zod is designed to be as developer-friendly as possible. The goal is to eliminate duplicative type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type. It's easy to compose simpler types into complex data structures.
- [JWT](https://jwt.io) (`Auth/Token`): JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- [Docker](https://www.docker.com) (`Container`): Docker is a platform designed to help developers build, share, and run container applications. We handle the tedious setup, so you can focus on the code.
- [OpenAPI (Swagger)](https://www.openapis.org) (`Documentation`): The OpenAPI Specification, previously known as the Swagger Specification, is a specification for a machine-readable interface definition language for describing, producing, consuming and visualizing web services.

## Architecture File and Folder

| File/Folder Name                           | Description                                                                                                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app.js`                               | Application starter, the entry point express application                                                                                                                                         |
| `src/routes/api.js`                        | List of route the RESTful Application, handle request method and mapping to the correct controller                                                                                               |
| `src/middleware/verifyToken.middleware.js` | Middleware for verify the `Authorization: Bearer "accessToken"` request before to the actual destination or controller                                                                           |
| `src/controller`                           | Folder that contain many controller file to handle the request from the route. In this controller, you can validate the request body and etc with Zod before sending request to the service file |
| `src/service`                              | Folder that contain many service file to handle the request from the controller. In this service, you can define the business logic before sending query to the repository or database           |
| `src/repository`                           | Folder that contain many repository file to handle query with some or no data from the service file. In this repository, you can define the query with prisma ORM to the database                |

## Prisma Cheatsheet

- Initialize

Run this command if you first setup with the prisma, prisma will generate the `.env` file and generate `prisma/schema.prisma` file for the data model

```bash
npx prisma init
```

- Introspection

Run this command if you have already database and inside the database already defined the tables, so prisma introspection will create the data model based on the tables inside your database. So the database will be the single source of tools.

```bash
npx prisma db pull
```

- Migration

Run this command if you don't have a database, but with this migration you must have a data model first by creating manually then you run the migration and your tables inside your database will be created based on data models in the `prisma/schema.prisma` file

> **Note**: Mostly if you run the migration first time, the migration name use `init`

```bash
npx prisma migrate dev --name <migration_name>
```

- Prisma Studio

Run this command if you want to open a model via web

```bash
npx prisma studio
```

- Seeding

> **Note**: Make sure you check the `package.json` file that have the custom command like this
>
> ```json
> "prisma": {
>    "seed": "node prisma/seed.js"
> },
> ```

```bash
npx prisma db seed
```
