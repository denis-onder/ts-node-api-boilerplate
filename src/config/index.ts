import dotenv from "dotenv";

// Load environmental variables located in the .env file
dotenv.config();

const { server, db, google } = {
  server: {
    port: parseInt(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || "development",
    secret: process.env.SECRET
  },
  db: {
    connection: process.env.DB_CONNECTION
  },
  google: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "/api/oauth/redirect"
  }
};

export { server, db, google };
