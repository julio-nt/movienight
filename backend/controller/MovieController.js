const Movie = require("../models/movie");

async function createMovie(req, res) {
  try {
    const { name, category_fk } = req.body;

    console.log(req.body)

    if (!name) {
      return res.status(400).json({ msg: "Nome é necessário" });
    }

    if (!category_fk) {
      return res.status(400).json({ msg: "Categoria é necessário" });
    }

    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllMovies(req, res) {
  try {
    const movie = await Movie.findAll();
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (movie) {
      return res.status(201).json(movie);
    }
    throw new Error("Registro não encontrado.");
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

module.exports = { getAllMovies, createMovie, getMovieById, updateMovie, deleteMovie };
