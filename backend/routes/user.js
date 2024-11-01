const route = require("express").Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/UserController");

route.post("/", createUser);
route.get("/all", getAllUsers);
route.get("/:id", getUserById);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
