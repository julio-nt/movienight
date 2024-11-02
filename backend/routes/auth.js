const route = require("express").Router();

const { login } = require("../controller/UserController");

route.post("/", login);

module.exports = route;
