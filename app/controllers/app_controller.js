const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const db_create = async (req, res) => {
  const { title, description, published } = req.body;

  if (!title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const tutorial = {
    title: title,
    description: description,
    published: published
  };

  try {
    const data = await Tutorial.create(tutorial);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tutorial."
    });
  }
};

const db_findAll = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const condition = { title: { [Op.like]: `%${title}%` } };

  try {
    const data = await Tutorial.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

const db_findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Tutorial.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
};

const db_update = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Tutorial.update(req.body, { where: { id: id } });
    if (num == 1) {
      res.send({
        message: "Tutorial was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating Tutorial with id=" + id });
    console.log(err);
  }
};

const db_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const rn = await Tutorial.destroy({ where: { id: id } });
    if (rn === 1) {
      res.send({ message: "Tutorial was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not delete Tutorial with id=" + id });
    console.log(err);
  }
};

const db_deleteAll = async (req, res) => {
  try {
    const nums = await Tutorial.destroy({
      where: {},
      truncate: false
    });
    res.send({ message: `${nums} Tutorials were deleted successfully!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while removing all tutorials." });
  }
};

const db_findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.findAll({ where: { published: true } });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  db_create,
  db_delete,
  db_deleteAll,
  db_findAll,
  db_findAllPublished,
  db_findOne,
  db_update,
}
