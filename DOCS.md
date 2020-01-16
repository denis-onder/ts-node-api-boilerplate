# Documentation

---

### Getting Started:

##### About

This boilerplate has been made to speed up the early stage of the development process, like setting up a basic server and wiring up all the common packages necessary for API/full-stack web application development.

Design pattern wise, this boilerplate had MVC in mind.

It's written to be used with [TypeScript](https://www.typescriptlang.org/) and [Express](https://expressjs.com/). The database solution used here is [MongoDB](https://www.mongodb.com/), which uses [Mongoose](https://mongoosejs.com/) as it's layer of communication. This can, however, easily be changed.

##### Usage

1. Clone this repository to your project directory.
2. Run `npm install`
3. Create your `.env` file based on the provided `example.env` file.
4. Run `npm start`

---

### Scripts

- `npm run compile` - Compiles the TypeScript code into plain JavaScript.
- `npm start` - Runs the compile script and starts the Node server.
- `npm run dev` - Runs the Node server from the uncompiled source code.
- `npm test` - Runs the test suite.
- `npm run scss` - Compiles the SCSS code to CSS.
- `npm run scss:watch` - Runs the SCSS compiler in watch mode.
- `scripts/build.sh` - Removes old and builds a new Docker image.
- `scripts/start.sh` - Runs the Docker image.

---

### Configuration

For the application to run properly, in a local environment, an `.env` file is required, which should be created in the root directory of the file structure.

An example file has been provided within the repository.

`example.env`

```env
PORT=
NODE_ENV=
DB_CONNECTION=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
```

- `PORT` - Server port
- `NODE_ENV` - Node environment
- `DB_CONNECTION` - Database connection URL
- `GOOGLE_OAUTH_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_OAUTH_CLIENT_SECRET` - Google OAuth client secret

---

### Structure:

```
.
├── .env
├── Dockerfile
├── DOCS.md
├── example.env
├── package.json
├── package-lock.json
├── logs
├── public
│   ├── constants
│   │   └── reset.css
│   ├── css
│   ├── js
│   │   ├── docs.js
│   │   └── root.js
│   └── scss
│       ├── docs.scss
│       ├── imports
│       │   ├── __info.scss
│       │   ├── __markdown.scss
│       │   └── __variables.scss
│       └── root.scss
├── README.md
├── scripts
│   ├── build.sh
│   └── start.sh
├── src
│   ├── auth
│   │   ├── index.ts
│   │   └── strategies
│   │       ├── google.ts
│   │       └── jwt.ts
│   ├── bin
│   │   ├── start.ts
│   │   └── stop.ts
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   ├── Auth.controller.ts
│   │   └── View.controller.ts
│   ├── db
│   │   ├── index.ts
│   │   └── models
│   │       ├── model.generator.ts
│   │       └── User.model.ts
│   ├── helpers
│   │   ├── CustomException.ts
│   │   ├── generateToken.ts
│   │   ├── hashPassword.ts
│   │   └── isEmpty.ts
│   ├── interfaces.ts
│   ├── middleware
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   ├── router.ts
│   │   ├── setViewEngine.ts
│   │   └── validateInput.ts
│   ├── Router.ts
│   ├── Server.ts
│   ├── tests
│   │   ├── Auth.test.ts
│   │   └── test.test.ts
│   ├── utils
│   │   └── apiTester.ts
│   └── validation
│       ├── emailRegex.ts
│       ├── errors.ts
│       ├── index.ts
│       ├── login.validation.ts
│       └── register.validation.ts
├── tsconfig.json
├── tslint.json
└── views
    ├── docs.hbs
    ├── layouts
    │   └── default.hbs
    ├── partials
    │   ├── footer.hbs
    │   ├── info.hbs
    │   └── nav.hbs
    └── root.hbs

```

##### Directories

- `dist` - This is where all the compiled JavaScript goes. Generated upon running `npm start`
- `logs` - Location of the `access.log` file. Keeps track of all attempts to access the API. This is generated once the server starts processing requests.
- `public` - Contains all the static assets, like JS files, CSS styles and what not.
- `public/<js/scss>` - Respective subfolders for JS and SCSS files.
- `public/constants` - Constant static files, such as the `reset.css` files should be stored here.
- `scripts` - Contains the shell scripts for building and running the app with Docker.
- `views` - Your pages go here.
- `views/layouts` - Layouts for the pages should be placed here.
- `views/partials` - Partials location.
- `src` - Source code for your app goes here.
- `src/bin` - Contains the `start` and `stop` scripts.
- `src/config` - All configuration files and similar things should be stored here.
- `src/controllers` - Your controllers go here.
- `src/db` - Database related things.
- `src/db/models` - Database models go here. A model generator has been provided in there.
- `src/middleware` - Server and Express middleware files are stored here.
- `src/tests` - Test suites are located here.
- `src/auth` - Authorization system files. Contains a Passport strategy incorporating JSON Web Tokens for authorization.
- `src/auth/strategies` - Passport authentication strategies.
- `src/validation` - Input validation related code goes here.
- `src/helpers` - Helper functions for keeping the codebase as DRY as possible.
- `src/utils` - Utilitarian functions go here. They might not be entirely necessary for the app to work.

##### Files

- `.env` - Your environmental variables should be kept in this file.
- `example.env` - Example file for creating your own `.env` file.
- `tsconfig.json` - TypeScript compiler configuration file.
- `tslint.json` - TypeScript linter configuration file.
- `src/Server.ts` - Server class.
- `src/Router.ts` - Router.
- `src/interfaces.ts` - Wrapper file for custom interfaces.

---

### Authentication Strategies:

This boilerplate utilizes [Passport.js](http://www.passportjs.org/) for authentication.
Once a user logs in, a bearer token will be returned to him, which is to be used for accessing protected endpoints.

The token is set to expire in an hour after logging in.

By personal choice, sessions have been disabled in favor of using the token expiration time as a way to mimic sessions. This can, however, easily be changed by calling the `session` method from the `Passport` object.

Be noted that serialization and deserialization of users has to be added by hand.

##### JWT

JSON Web Tokens are the primary means of authorization. Requests which are to be protected use the token for the means of checking if they are valid, and if so, if the user is allowed to reach the said endpoint.

As noted above this sub-section, tokens expire an hour after creation. If you'd like to change the token expiration time, you can do so by changing the `expiresIn` object property in `src/helpers/generateToken.ts`.

```js
import jwt from "jsonwebtoken";
import { server } from "../config";

export default payload => {
  const token = jwt.sign(payload, server.secret, {
    expiresIn: "1h" // Token expiration time.
  });
  return `Bearer ${token}`;
};
```

---

### Router

[Postman Collection](https://www.getpostman.com/collections/ca5c894df425fdc08302)

This boilerplate only provides a handful of requests, of which two are handling static file rendering, and five are there for doing work with users.

The logic behind each requests lays in the controllers and routers.

`src/Router.ts`

```js
import express from "express";
import passport from "passport";
import ViewController from "./controllers/View.controller";
import AuthController from "./controllers/Auth.controller";
import validateInput from "./middleware/validateInput";

class Router {
  public API_ROUTER = express.Router();
  public VIEW_ROUTER = express.Router();
  constructor() {
    this.setAPIEndpoints();
    this.setViewEndpoints();
  }
  private setAPIEndpoints(): void {
    // Your API endpoints go here
    this.API_ROUTER.post(
      "/auth/register",
      validateInput,
      AuthController.register
    );
    this.API_ROUTER.post("/auth/login", validateInput, AuthController.login);
    this.API_ROUTER.get(
      "/auth/me",
      passport.authenticate("jwt", { session: false }),
      AuthController.getCurrentUser
    );
    this.API_ROUTER.put(
      "/auth/edit",
      passport.authenticate("jwt", { session: false }),
      validateInput,
      AuthController.edit
    );
    this.API_ROUTER.delete(
      "/auth/delete",
      passport.authenticate("jwt", { session: false }),
      AuthController.delete
    );
  }
  private setViewEndpoints(): void {
    // Your view endpoints can be declared here
    this.VIEW_ROUTER.get("/", ViewController.renderRoot);
    this.VIEW_ROUTER.get("/docs", ViewController.renderDocs);
  }
}
```

As you can see, we are declaring, and using two separate routers. The reason behind this is to separate the two types of logic we have present in this instance.

This can be tailored to whatever your needs are, depending on if you decide to choose this templating engine or not.

Not to mention, adding additional routers can help with API versioning. It is simple to just add it to the configuration, as shown below.

`src/middleware/router.ts`

```js
import { Application } from "express";
import { API_ROUTER, VIEW_ROUTER } from "../Router";

export default (app: Application): void => {
  app.use("/api", API_ROUTER);
  app.use("/", VIEW_ROUTER);
};
```

---

### Authentication Controller:

There are 5 requests available from the authentication controller:

1. [Register](#register)
2. [Login](#login)
3. [Get Current User](#getcurrentuser)
4. [Edit Account](#editaccount)
5. [Delete Account](#deleteaccount)

##### Register

`POST /api/auth/register`

`Example JSON request body`

```json
{
  "first_name": "Test",
  "last_name": "Account",
  "email": "test_account@example.com",
  "password": "test1234",
  "confirm_password": "test1234"
}
```

`Example response`

```json
{
  "_id": "5e0428b26505de2a0a488d61",
  "first_name": "Test",
  "last_name": "Account",
  "email": "test_account@example.com",
  "password": "$2b$14$QV3ASTCubM2Mcj4yqAlI7O8JDHsWPV9i8GYXLIeUUlsk0IcB4IPuS",
  "createdAt": "2020-01-01T00:00:00.078Z",
  "__v": 0
}
```

---

##### Login

`POST /api/auth/login`

`Example JSON request body`

```json
{
  "email": "test_account@example.com",
  "password": "test1234"
}
```

`Example response`

```json
{
  "loggedIn": true,
  "token": "Bearer TOKEN"
}
```

---

> **NOTE:** The following routes all require the `Authorization` header to be set to the Bearer token received from when the user logged in.

---

##### Get Current User

`Authorization header required!`

`GET /api/auth/me`

`No request body required.`

`Example response`

```json
{
  "id": "5e0428b26505de2a0a488d61",
  "first_name": "Test",
  "last_name": "Account",
  "email": "test_account@example.com",
  "createdAt": "2020-01-01T00:00:00.078Z"
}
```

---

##### Edit Account

`Authorization header required!`

`PUT /api/auth/edit`

`Example JSON request body`

```json
{
  "first_name": "Edited",
  "last_name": "Account",
  "email": "edited_account@example.com",
  "password": "12345test",
  "confirm_password": "12345test"
}
```

`Example response`

```json
{
  "_id": "5e0428b26505de2a0a488d61",
  "first_name": "Edited",
  "last_name": "Account",
  "email": "edited_account@example.com",
  "password": "$2b$14$QV3AST45lNBFjlgFDSGdsfgjI7O8JFASFGloN459asXc",
  "createdAt": "2020-01-01T00:00:00.078Z",
  "__v": 0
}
```

---

##### Delete Account

`Authorization header required!`

`DELETE /api/auth/delete`

`No request body required.`

`Example response`

```json
{
  "deleted": true,
  "timestamp": 1577582955245
}
```

---

### Testing

A test suite has been provided which runs a set of unit tests, checking the Authentication controller.
Additional tests can be added in the `src/tests` directory.

This boilerplate utilizes [Mocha and Chai](https://mochajs.org/) for it's test suite.

---
