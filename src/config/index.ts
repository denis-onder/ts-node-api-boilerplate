import dotenv from "dotenv";

// Load environmental variables located in the .env file
dotenv.config();

const { server, db } = {
  server: {
    port: parseInt(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || "development"
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  }
};

export { server, db };
