const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("movie_night", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
