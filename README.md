# aniConDB

An anime and cosplay convention database listing conventions across the United States. The database include venue information,
hotels, badge prices, guests, and vendors. This app uses the NestJS framework.

## Project Setup

### Fork Repository
Fork the repository to your account.

### Clone repository
Clone the forked repository to a local directory, or start a GitHub Codespace.

### Set up Database
aniConDB uses PostgreSQL as it's database. You can either download the client, or run a Docker container. You can use any username, password, and database name. If you wish to use a Docker container, run the script below:

```bash
docker run -p 5432:5432 \
    --name postgres \
    -e POSTGRES_USER=<username> \
    -e POSTGRES_PASSWORD=<password> \
    -e POSTGRES_DB=<database> \
    postgres
```

### Start coding
Write your code and commit.

### Push to your forked repository
Push your code to your forked repository

### Open Pull Request
Open a pull request from your forked repository to the main repository (`origin/main`)

## How to Use
aniConDB is an API currently in development. To use the API, run the project with `npm start` or `npm start:dev`. You can the use Postman or any other software to access the endpoints.

Alternatively, you can go to `localhost:3000/docs` while the project is running to access the Swagger Docs to access the endpoints there.
