const User = require("../models/user");

async function createUser(req, res) {
  try {
    const { name, username, password } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Nome é necessário" });
    }

    if (!username) {
      return res.status(400).json({ msg: "Usuário é necessário" });
    }

    if (!password) {
      return res.status(400).json({ msg: "Senha é necessário" });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllUsers(req, res) {
  try {
    const user = await User.findAll();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(201).json(user);
    }
    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const nId = Number(id);

  try {
    const [updated] = await User.update(req.body, { where: { id: nId } });

    if (updated) {
      const updatedResponse = await User.findByPk(nId);
      return res.status(200).json(updatedResponse);
    }

    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao editar registro." });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };
