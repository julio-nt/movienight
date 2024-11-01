const { DataTypes } = require("sequelize");
const sequelize = require("../conf/sequelize");

const Friend = sequelize.define(
  "Friend",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    friend_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "friend",
  }
);

module.exports = Friend;
