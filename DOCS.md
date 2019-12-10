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
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

- `PORT` - Server port
- `NODE_ENV` - Node environment
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

---

### Structure:

```
|   .dockerignore
│   .env
|   .gitignore
|   Dockerfile
|   DOCS.md
│   example.env
|   package.json
|   package-lock.json
|   README.md
|   tsconfig.json
|   tslint.json
|
└───dist # This is where the compiled JavaScript code goes.
|
└───logs # Morgan logging system output folder
│   
└───node_modules
│   
└───public # Static assets
|   └───js # JavaScript files
|   └───scss # SCSS files
|   |   └───imports # SCSS partials
|   └───css # Location of all the compiled CSS. Not included in source control
```