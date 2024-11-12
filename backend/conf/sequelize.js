const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("movie_night", "root", "Resolve-85E", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
