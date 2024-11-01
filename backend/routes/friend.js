const route = require("express").Router();

const { createFriend, getAllFriends, getFriendById, updateFriend, deleteFriend } = require("../controller/FriendController");

route.post("/", createFriend);
route.get("/all", getAllFriends);
route.get("/:id", getFriendById);
route.put("/:id", updateFriend);
route.delete("/:id", deleteFriend);

module.exports = route;
