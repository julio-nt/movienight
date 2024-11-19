const route = require("express").Router();

const { createMovie, getAllMovies, getMovieByTmdbId, getMovieById , getMovieByType, updateMovie, deleteMovie } = require("../controller/MovieController");

route.post("/", createMovie);
route.get("/all", getAllMovies);
route.get("/all/:type", getMovieByType);
route.get("/tmdb/:id_tmdb", getMovieByTmdbId);
route.get("/:id", getMovieById);
route.put("/:id", updateMovie);
route.delete("/:id", deleteMovie);

module.exports = route;
