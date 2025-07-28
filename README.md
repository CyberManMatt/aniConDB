# aniConDB

An anime and cosplay convention database listing conventions across the United States. The database includes venue information,
hotels, badge prices, guests, and vendors. This app uses the NestJS framework.

## Project Setup and How to Contribute

### Fork Repository
Fork the repository to your account.

### Clone repository
Clone the forked repository to a local directory or start a GitHub Codespace.

### Set up Database
aniConDB uses PostgreSQL as its database. You can either download the client or run a Docker container. You can use any username, password, and database name. If you wish to use a Docker container, run the script below:

```bash
docker run -p 5432:5432 \
    --name postgres \
    -e POSTGRES_USER=<username> \
    -e POSTGRES_PASSWORD=<password> \
    -e POSTGRES_DB=<database> \
    postgres
```

### Make a `.env.development` file
At the root of the project, create a `.env.development` file. The `.example.env` file is there to provide a reference. For the `JWT_SECRET` entry, you can generate a JWT secret key [at this website](https://jwtsecrets.com/).

The required environment variables are:
- `POSTGRES_PASSWORD`
- `JWT_SECRET`

The default user name for Postgres is `anicondbdev`

### Start coding
Put your code in writing and commit!

### Push to your forked repository
Push your code to your forked repository

### Open Pull Request
Open a pull request from your forked repository to the main repository (`origin/main`)

## How to Use
aniConDB is an API currently in development. To use the API, run the project with `npm start:dev`. You can use Postman or any other software to access the endpoints. Be sure that your database is also running, or you will get an error.

Alternatively, you can go to `localhost:3000/docs` in a web browser while the project is running to access the Swagger Docs to access the endpoints there.

