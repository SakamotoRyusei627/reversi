require("dotenv").config({
  path: ".env",
});

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER || "RYUSEI",
      database: process.env.DB_NAME || "othello",
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
