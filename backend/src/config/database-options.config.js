require("dotenv").config();

module.exports = {
  development: {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "db",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
  },
};