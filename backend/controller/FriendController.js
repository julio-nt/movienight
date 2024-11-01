const Friend = require("../models/friend");

async function createFriend(req, res) {
  try {
    const { friend_fk } = req.body;

    if (!friend_fk) {
      return res.status(400).json({ msg: "ID do amigo é necessário" });
    }

    const friend = await Friend.create(req.body);
    return res.status(201).json(friend);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

async function getAllFriends(req, res) {
  try {
    const friend = await Friend.findAll();
    return res.status(200).json(friend);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar todos os registros." });
  }
}

async function getFriendById(req, res) {
  const { id } = req.params;
  try {
    const friend = await Friend.findByPk(id);
    if (friend) {
      return res.status(201).json(friend);
    }
    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

async function updateFriend(req, res) {
  const { id } = req.params;
  const nId = Number(id);

  try {
    const [updated] = await Friend.update(req.body, { where: { id: nId } });

    if (updated) {
      const updatedResponse = await Friend.findByPk(nId);
      return res.status(200).json(updatedResponse);
    }

    throw new Error("Registro não encontrado.");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao editar registro." });
  }
}

async function deleteFriend(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Friend.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}

module.exports = { getAllFriends, createFriend, getFriendById, updateFriend, deleteFriend };
