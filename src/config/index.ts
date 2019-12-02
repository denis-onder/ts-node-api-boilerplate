import dotenv from "dotenv";

// Load environmental variables located in the .env file
dotenv.config();

export default {
  server: {
    port: parseInt(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || "development"
  }
};
