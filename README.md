# Fixtures Management

## How to
    1. If you wish to run the application locally,
       1. Clone the repository
       2. Make sure you have MySQL installed/running.
       3. Create the database for both development and test environment, refer to config/config.js

## Install

    npm install
    npx sequelize db:migrate --env development

## Run the app

    npm start

## Run the tests

    npx sequelize db:migrate --env test
    npm test

# APIs

The APIs are described below.

## Get list of Teams

### Request

`GET /api/v1/teams`

    curl -i -H 'Accept: application/json' https://fixtures-management-system-01.herokuapp.com/api/v1/teams

### Response

    HTTP/1.1 200 OK
    Date: Tue, 18 Oct 2022 03:39:07 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 9368

    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "results": [
                {
                    "id": 401,
                    "name": "Manchester United",
                    "location": "Manchester",
                    "manager": "Ole Gunnar Solskjaer",
                    "capacity": 76212,
                    "league": "Premier League",
                    "stadium": "Old Trafford",
                    "createdAt": "2022-10-17T10:26:05.000Z",
                    "updatedAt": "2022-10-17T10:26:05.000Z"
                },
                {
                    "id": 411,
                    "name": "Liverpool",
                    "location": "Liverpool",
                    "manager": "Jurgen Klopp",
                    "capacity": 54074,
                    "league": "Premier League",
                    "stadium": "Anfield",
                    "createdAt": "2022-10-17T10:26:05.000Z",
                    "updatedAt": "2022-10-17T10:26:05.000Z"
                },
                {
                    "id": 421,
                    "name": "Chelsea",
                    "location": "London",
                    "manager": "Thomas Tuchel",
                    "capacity": 42055,
                    "league": "Premier League",
                    "stadium": "Stamford Bridge",
                    "createdAt": "2022-10-17T10:26:05.000Z",
                    "updatedAt": "2022-10-17T10:26:05.000Z"
                },
            ]
        },
        "errors": []
    }

## Create a new Team

### Request

`POST /api/v1/teams`

    curl -i -H 'Accept: application/json' -d '{"team":{"name":"Everton","location":"Goodison Park","manager":"Frank Lampard","stadium":"Goodison Park","capacity":30000,"league":"Premier League"}}' -X POST https://fixtures-management-system-01.herokuapp.com/api/v1/teams

### Response

    HTTP/1.1 201 Created
    Date: Tue, 18 Oct 2022 03:49:46 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 299

    {
        "statusCode": 201,
        "message": "OK",
        "data": {
            "result": {
                "id": 135,
                "name": "Testing One Two",
                "location": "Goodison Park",
                "manager": "Frank Lampard",
                "stadium": "Goodison Park",
                "capacity": 30000,
                "league": "Premier League",
                "updatedAt": "2022-10-18T03:49:46.490Z",
                "createdAt": "2022-10-18T03:49:46.490Z"
            }
        },
        "errors": []
    }

## Get list of fixtures 

### Request

`GET /api/v1/fixtures`

    curl -i -H 'Accept: application/json' https://fixtures-management-system-01.herokuapp.com/api/v1/fixtures

### Response

    HTTP/1.1 200 OK
    Date: Tue, 18 Oct 2022 03:39:15 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 472

    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "results": [
                {
                    "id": 1,
                    "homeTeamId": 401,
                    "awayTeamId": 411,
                    "date": "16/10/2022",
                    "time": "23:00",
                    "referee": "Pierluigi Collina",
                    "matchStatus": "upcoming",
                    "venue": "Old Trafford",
                    "score": {
                        "homeTeam": 0,
                        "awayTeam": 0
                    },
                    "createdAt": "2022-10-17T10:26:51.000Z",
                    "updatedAt": "2022-10-17T10:26:51.000Z",
                    "homeTeam": "Manchester United",
                    "awayTeam": "Liverpool"
                }
            ],
            "currentPage": 1,
            "totalPages": 1,
            "totalItems": 1,
            "nextPage": null,
            "previousPage": null
        },
        "errors": []
    }

## Get list of fixtures by date with pagination options

### Request

`GET /api/v1/fixtures?date=16/10/2022&page=1&size=5`

    curl -i -H 'Accept: application/json' https://fixtures-management-system-01.herokuapp.com/api/v1/fixtures?date=16/10/2022&page=1&size=5

### Response

    HTTP/1.1 200 OK
    Date: Tue, 18 Oct 2022 03:55:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 149

    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "results": [],
            "currentPage": 0,
            "totalPages": 0,
            "totalItems": 0,
            "nextPage": null,
            "previousPage": null
        },
        "errors": []
    }