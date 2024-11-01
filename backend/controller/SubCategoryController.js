const SubCategory = require("../models/subCategory");

async function createSubCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Nome é necessário" });
    }

    const subCategory = await SubCategory.create(req.body);
    return res.status(201).json(subCategory);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllSubCategorys(req, res) {
  try {
    const subCategory = await SubCategory.findAll();
    return res.status(200).json(subCategory);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getSubCategoryById(req, res) {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      return res.status(201).json(subCategory);
    }
    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function updateSubCategory(req, res) {
  const { id } = req.params;
  const nId = Number(id);

  try {
    const [updated] = await SubCategory.update(req.body, { where: { id: nId } });

    if (updated) {
      const updatedResponse = await SubCategory.findByPk(nId);
      return res.status(200).json(updatedResponse);
    }

    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao editar registro." });
  }
}

async function deleteSubCategory(req, res) {
  const { id } = req.params;
  try {
    const deleted = await SubCategory.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}

module.exports = { getAllSubCategorys, createSubCategory, getSubCategoryById, updateSubCategory, deleteSubCategory };
