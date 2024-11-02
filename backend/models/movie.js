const { DataTypes } = require("sequelize");
const sequelize = require("../conf/sequelize");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_tmdb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dislike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    wish_to_watch: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    category_fk_list: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_category_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "movie",
  }
);

module.exports = Movie;
