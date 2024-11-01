const route = require("express").Router();

const { createCategory, getAllCategorys, getCategoryById, updateCategory, deleteCategory } = require("../controller/CategoryController");

route.post("/", createCategory);
route.get("/all", getAllCategorys);
route.get("/:id", getCategoryById);
route.put("/:id", updateCategory);
route.delete("/:id", deleteCategory);

module.exports = route;
