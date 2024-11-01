const Category = require("../models/category");

async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Nome é necessário" });
    }

    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllCategorys(req, res) {
  try {
    const category = await Category.findAll();
    return res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      return res.status(201).json(category);
    }
    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const nId = Number(id);

  try {
    const [updated] = await Category.update(req.body, { where: { id: nId } });

    if (updated) {
      const updatedResponse = await Category.findByPk(nId);
      return res.status(200).json(updatedResponse);
    }

    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao editar registro." });
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Category.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}

module.exports = { getAllCategorys, createCategory, getCategoryById, updateCategory, deleteCategory };
