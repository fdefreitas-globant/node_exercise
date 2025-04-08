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

## Endpoints

#### 1. **Search Advice by Keyword**

- **Endpoint**: `/api/advice/search/:keyword`
- **Method**: `GET`
- **Description**: Fetches advice that matches the provided keyword.
- **Parameters**:
  - `:keyword` (path parameter): The keyword to search for in the advice.
- **Response**:
  - **200 OK**: Returns a JSON object containing the matching advice slips.
    ```json
    {
      "slips": [
        {
          "id": 1,
          "advice": "Believe in yourself."
        }
      ]
    }
    ```
  - **500 Internal Server Error**: Returns an error message if the service fails.
    ```json
    {
      "title": "API server encountered an unexpected error."
    }
    ```

#### 2. **Get Advice by Keyword**

- **Endpoint**: `/advice/:keyword`
- **Method**: `GET`
- **Description**: Fetches a single piece of advice that matches the provided keyword.
- **Parameters**:
  - `:keyword` (path parameter): The keyword to search for in the advice.
- **Response**:
  - **200 OK**: Returns a JSON object containing the advice.
    ```json
    {
      "advice": "Stay positive!"
    }
    ```
  - **400 Bad Request**: Returns an error message if the service does not find anything.
    ```json
    {
      "title": "Bad Request"
    }
    ```
  - **502 Bad Gateway**: Returns an error message if the service fails.
    ```json
    {
      "title": "Bad Gateway"
    }
    ```
