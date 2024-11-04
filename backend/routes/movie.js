const route = require("express").Router();

const { createMovie, getAllMovies, getMovieByTmdbId, getMovieByType, updateMovie, deleteMovie } = require("../controller/MovieController");

route.post("/", createMovie);
route.get("/all", getAllMovies);
route.get("/all/:type", getMovieByType);
route.get("/:id_tmdb", getMovieByTmdbId);
route.put("/:id", updateMovie);
route.delete("/:id", deleteMovie);

module.exports = route;
