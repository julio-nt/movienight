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
    id_tmdb: {
      type: DataTypes.INTEGER,
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
      defaultValue: true,
    },
    dislike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    hate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    wish_to_watch: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    category_fk_list: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_category_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vote_average: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "movie",
  }
);

module.exports = Movie;
