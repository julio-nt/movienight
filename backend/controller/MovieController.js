const Movie = require("../models/movie");

async function createMovie(req, res) {
  try {
    const { name, id_tmdb, user_fk } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Nome é necessário" });
    }

    if (!id_tmdb) {
      return res.status(400).json({ msg: "ID referência do The Movie Database é necessário" });
    }

    if (!user_fk) {
      return res.status(400).json({ msg: "Usuário é necessário" });
    }

    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllMovies(req, res) {
  const user_fk = req.headers.user_fk;
  try {
    const movie = await Movie.findAll({
      where: { user_fk },
    });
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getMovieByTmdbId(req, res) {
  const user_fk = req.headers.user_fk;
  const { id_tmdb } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { user_fk, id_tmdb },
    });
    if (movie) {
      return res.status(201).json(movie);
    }
    return res.status(204).json({ msg: "Registro não encontrado." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function getMovieByType(req, res) {
  const user_fk = req.headers.user_fk;
  const { type } = req.params;

  console.log("aqui");
  console.log(type);
  console.log(user_fk);
  try {
    if (type === "favorite") {
      const movie = await Movie.findAll({
        where: { user_fk, favorite: 1 },
      });
      if (movie) {
        return res.status(201).json(movie);
      }
    }

    if (type === "liked") {
      const movie = await Movie.findAll({
        where: { user_fk, like: 1 },
      });
      if (movie) {
        return res.status(201).json(movie);
      }
    }

    if (type === "disliked") {
      const movie = await Movie.findAll({
        where: { user_fk, dislike: 1 },
      });
      if (movie) {
        return res.status(201).json(movie);
      }
    }

    if (type === "hate") {
      const movie = await Movie.findAll({
        where: { user_fk, hate: 1 },
      });
      if (movie) {
        return res.status(201).json(movie);
      }
    }

    if (type === "wish_to_watch") {
      const movie = await Movie.findAll({
        where: { user_fk, wish_to_watch: 1 },
      });
      if (movie) {
        return res.status(201).json(movie);
      }
    }
    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function getMovieByTmdb(req, res) {
  const user_fk = req.headers.user_fk;
  const { id_tmdb } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { user_fk, id_tmdb },
    });
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function updateMovie(req, res) {
  const { id } = req.params;
  const nId = Number(id);

  try {
    const [updated] = await Movie.update(req.body, { where: { id: nId } });

    if (updated) {
      const updatedResponse = await Movie.findByPk(nId);
      return res.status(200).json(updatedResponse);
    }

    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao editar registro." });
  }
}

async function deleteMovie(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Movie.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}

module.exports = { getAllMovies, createMovie, getMovieByTmdbId, getMovieByType, updateMovie, deleteMovie };
