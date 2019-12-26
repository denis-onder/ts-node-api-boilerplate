# Documentation:

---

### Getting Started:

##### About:

This boilerplate has been made to speed up the early stage of the development process, like setting up a basic server and wiring up all the common packages necessary for API/full-stack web application development.

Design pattern wise, this boilerplate had MVC in mind.

It's written to be used with TypeScript and Express. The database solution used here is MongoDB, which uses Mongoose as it's layer of communication. This can, however, easily be changed.

##### Usage:

1. Clone this repository to your project directory.
2. Run `npm install`.
3. Create your `.env` file based on the provided `example.env` file.
4. Run `npm start`.

---

### Scripts:

- `npm run compile` - Compiles the TypeScript code into plain JavaScript.
- `npm start` - Runs the compile script and starts the Node server.
- `npm run dev` - Runs the Node server from the uncompiled source code.
- `npm test` - Runs the test suite.
- `npm run scss` - Compiles the SCSS code to CSS.
- `npm run scss:watch` - Runs the SCSS compiler in watch mode.
- `scripts/build.sh` - Removes old and builds a new Docker image.
- `scripts/start.sh` - Runs the Docker image.

---

### Configuration:

For the application to run properly, in a local environment, an `.env` file is required, which should be created in the root directory of the file structure.

An example file has been provided within the repository.

`example.env`

```env
PORT=
NODE_ENV=
DB_CONNECTION=
```

- `PORT` - Server port
- `NODE_ENV` - Node environment
- `DB_CONNECTION` - Database connection URL

---

### Structure:

```
.
├── Dockerfile
├── example.env
├── .env
├── logs
├── public
│   ├── constants
│   │   └── reset.css
│   ├── js
│   │   ├── docs.js
│   │   └── root.js
│   └── scss
│       ├── docs.scss
│       ├── imports
│       │   └── __variables.scss
│       └── root.scss
├── scripts
│   ├── build.sh
│   └── start.sh
├── src
│   ├── Router.ts
│   ├── Server.ts
│   ├── auth
│   │   ├── index.ts
│   │   └── strategy.ts
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
│   │       ├── User.model.ts
│   │       └── model.generator.ts
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
│   ├── tests
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
    │   └── footer.hbs
    └── root.hbs
```

##### Directories:

- `dist` - This is where all the compiled JavaScript goes. Generated upon running `npm start`.
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
- `src/validation` - Input validation related code goes here.
- `src/helpers` - Helper functions for keeping the codebase as DRY as possible.
- `src/utils` - Utilitarian functions go here. They might not be entirely necessary for the app to work.

##### Files:

- `.env` - Your environmental variables should be kept in this file.
- `example.env` - Example file for creating your own `.env` file.
- `tsconfig.json` - TypeScript compiler configuration file.
- `tslint.json` - TypeScript linter configuration file.
- `src/Server.ts` - Server class.
- `src/Router.ts` - Router.
- `src/interfaces.ts` - Wrapper file for custom interfaces.

---

### Requests:

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

##### Authentication:

There are 5 requests available from the authentication controller:

1. Register
2. Login
3. Get Current User
4. Edit User
5. Delete

##### Register:

`POST /api/auth/register`

`Example JSON request body`

```json
{
  "first_name": "Test",
  "last_name":  "Account",
  "email":  "test_account@example.com",
  "password": "test1234",
  "confirm_password": "test1234",
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
