### Documentation:

---

### Scripts:

- `npm run compile` - Compiles the TypeScript code into plain JavaScript.
- `npm start` - Runs the compile script and starts the Node server.
- `npm run dev` - Runs the Node server from the uncompiled source code.
- `npm test` - Runs the test suite.
- `npm run scss` - Compiles the SCSS code to CSS.
- `npm run scss:watch` - Runs the SCSS compiler in watch mode.

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
├── dist
├── Dockerfile
├── DOCS.md
├── example.env
├── scripts
│   ├── build.sh
│   └── start.sh
├── scripts
│   ├── build.sh
│   └── start.sh
├── logs
│   └── access.log
├── package.json
├── package-lock.json
├── public
│   ├── constants
│   │   └── reset.css
│   ├── js
│   │   └── root.js
│   └── scss
│       ├── imports
│       │   └── __variables.scss
│       └── root.scss
├── README.md
├── src
│   ├── bin
│   │   ├── start.ts
│   │   └── stop.ts
│   ├── auth
│   │   ├── index.ts
│   │   └── strategy.ts
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   └── ViewController.ts
│   ├── db
│   │   ├── index.ts
│   │   └── models
│   │       └── model.generator.ts
│   ├── middleware
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   ├── router.ts
│   │   └── setViewEngine.ts
│   ├── Router.ts
│   ├── Server.ts
│   └── tests
│       └── test.test.ts
├── tsconfig.json
├── tslint.json
└── views
    ├── layouts
    │   └── default.hbs
    ├── partials
    │   └── footer.hbs
    └── root.hbs

```

##### Directories:

- `dist` - This is where all the compiled JavaScript goes. Generated upon running `npm start`.
- `logs` - Location of the `access.log` file. Keeps track of all attempts to access the API.
- `public` - Contains all the static assets, like JS files, CSS styles and what not.
- `public/<js/scss>` - Respective subfolders for JS and SCSS files.
- `public/constants` - Constant static files, such as the `reset.css` files should be stored here.
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

##### Files:

- `.env` - Your environmental variables should be kept in this file.
- `example.env` - Example file for creating your own `.env` file.
- `tsconfig.json` - TypeScript compiler configuration file.
- `tslint.json` - TypeScript linter configuration file.
- `src/Server.ts` - Server class.
- `src/Router.ts` - Router.

---
