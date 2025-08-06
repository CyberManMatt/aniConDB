# aniConDB

An anime and cosplay convention database listing conventions across the United States. The database includes venue information,
hotels, badge prices, guests, and vendors. This app uses the NestJS framework.

## Project Setup and How to Contribute

### Fork Repository
Fork the repository to your account.

### Clone repository
Clone the forked repository to a local directory or start a GitHub Codespace.

### Set up Database
aniConDB uses PostgresSQL as its database. You can either download the client or run a Docker container. You can use any username, password, and database name. If you wish to use a Docker container, run the script below:

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

The default username for Postgres is `anicondbdev`

### Run the development server
Run `npm run start:dev` in the terminal to run the development server. If you are using VS Code, you can Run and Debug the "Run dev server" setup.

### Start coding
Put your code in writing and commit!

### Push to your forked repository
Push your code to your forked repository

### Open Pull Request
Open a pull request from your forked repository to the main repository (`origin/main`)

## How to Use
### Swagger UI
1. Go to `localhost:3000/docs`

2. Scroll down to the `POST /users` endpoint and click "Try it Out."

3. Fill out the JSON object. The only required fields are `username`, `email address`, and `password`.

4. Click "Execute." You should receive a `201` status.

5. Go to the `POST /auth/sign-in` endpoint and click "Try It Out"

6. Input the email address and password that was created at step 2 and click "Execute"

7. Copy the `accessToken` from the response body

8. Go to the top of the page and click "Authorize"

9. Paste the `accessToken` in the "Value" field and click "Authorize"

### `.http` files
1. Create a `http-client.private.env.json` file at the project's root. The file should look like below:
    ```json
    {
      "dev": {
        "hostAddress": "localhost:3000",
        "accessToken": ""
      }
    }
    ```

2. Open the `src/users/http/users.post.endpoints.http` file. Replace the values with your own values and run the file. You should get a `201` status.

3. Open the `src/auth/http/auth.post.endpoint.http` file. Replace the values with the values you used in step 2. You should get a `201` status, and a response with an `accessToken` and a `refreshToken`. If not, you may have typed the email address or password wrong.

4. Copy the `accessToken` and paste it in the `http-client.private.env.json` file in the `accessToken` field.