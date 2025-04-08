# Test Project

ACS Reports Team test project.

## Setup

- Install required engines with `nvm install`
- Install dependencies with `npm install`
- Run `docker-compose up -d db`
  - Run `docker-compose exec db bin/db-setup`
  - Note, the postgres instance will be attached to port `5400`
- Run `bin/setup` to migrate your databases
  - If you are using `docker` you are good to go, otherwise fill out the details for your enviroment in `.env.json` and run the migrations again
- Run `npm run debug`

Done!

## Running JSON Server

- Install `json-server` globally with `npm install -g json-server`
- Start the server with the following command:
  ```bash
  json-server -p 8080 data/adviceslip.json
  ```
- Update the `BASE_URL` in your `.env` file to:
  ```
  BASE_URL=http://localhost:8080/advice_
  ```
- Currently, only the `motivation` parameter is supported.

#### If using docker compose

- Forward the port through the internet using `ngrok` or the VS Code port forwarding functionality to avoid extra configuration.
  - For `ngrok`, run:
    ```bash
    ngrok http 8080
    ```
  - For VS Code, use the "Ports" tab to forward port `8080`.
- Use the forwarded URL as the `BASE_URL` in your `.env` file.
  ```
  BASE_URL=$FORWARDED_URL/advice_
  ```
