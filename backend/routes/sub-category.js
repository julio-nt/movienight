const route = require("express").Router();

const { createSubCategory, getAllSubCategorys, getSubCategoryById, updateSubCategory, deleteSubCategory } = require("../controller/SubCategoryController");

route.post("/", createSubCategory);
route.get("/all", getAllSubCategorys);
route.get("/:id", getSubCategoryById);
route.put("/:id", updateSubCategory);
route.delete("/:id", deleteSubCategory);

module.exports = route;
