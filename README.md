# League of Legends Champion React Web-App

## Stack

- ES6 Javascript standard
- Node.js w/ Express.js framework
- MongoDB w/ Monk.js driver
- React.js

## Setup

### Local
I suggest creating a .env file with the following in the root directory if you wish to run another environment or specify your own DB URI:
```
ENVIRONMENT="development"
MONG0DB_URL="..."
```
and another in the root of the React app:
```
SKIP_PREFLIGHT_CHECK=true
```
Make sure that MongoDB is running on a localhost port if you wish to connect to a DB to run seed jobs. 

To run the backend API, run the following:
```
$ npm i
$ npm run start
$ info: api.seeds.seedChampions: champion list has already been seeded
$ info: api.bin.www#onListening: listening on port 3001
```

To run the React web-app:
```
$ npm i
$ npm run start
```

A development window will open in your browser.

### Production
A compiled production web-app is available at https://bsit-champions.herokuapp.com.

## API Endpoints
- GET `/api/champions/`
    - Takes option parameters `limit` and `offset` as query parameters. `limit` defaults to 10, `offset` defaults to 0. Sending a value < 1 for limit returns all results.
    - Returns a JSON array of champions ordered A-Z
- GET `/api/champions/:championId`
    - Returns a JSON object for the relevant `championId`
