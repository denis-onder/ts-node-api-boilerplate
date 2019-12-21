import { Sequelize } from "sequelize";
import { server, db } from "../config";

const database = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: "postgres"
});

async function connect() {
  const config = {
    // If the server is in a non-production environment, enable logging
    logging: server.env !== "production" ? console.log : false
  };
  try {
    await database.authenticate(config);
    console.log("Connected to the database!");
    // If the server is in a non-production environment, enable sync
    if (server.env !== "production") database.sync(config);
  } catch (error) {
    this.stop(error);
  }
}

export { database, connect };
