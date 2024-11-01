const route = require("express").Router();

const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require("../controller/MovieController");

route.post("/", createMovie);
route.get("/all", getAllMovies);
route.get("/:id", getMovieById);
route.put("/:id", updateMovie);
route.delete("/:id", deleteMovie);

module.exports = route;
