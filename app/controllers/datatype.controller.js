const db = require("../models");
const Datatype = db.datatypes;
const Op = db.Sequelize.Op;

// Create and Save a new Datatype
exports.create = (req, res) => {
  // Validate request
  if (!req.body.label) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Datatype
  const datatype = {
    label: req.body.label,
    value: req.body.value,
    slug: req.body.slug,
    isActive: req.body.isActive ? req.body.isActive : false
  };

  // Save Datatype in the database
  Datatype.create(datatype)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Datatype."
      });
    });
};

// Retrieve all Datatypes from the database.
exports.findAll = (req, res) => {
  const label = req.query.label;
  var condition = label ? { label: { [Op.iLike]: `%${label}%` } } : null;

  Datatype.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving datatypes."
      });
    });
};

// Find a single Datatype with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Datatype.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Datatype with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Datatype with id=" + id
      });
    });
};

// Update a Datatype by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Datatype.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Datatype was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Datatype with id=${id}. Maybe Datatype was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Datatype with id=" + id
      });
    });
};

// Delete a Datatype with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Datatype.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Datatype was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Datatype with id=${id}. Maybe Datatype was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Datatype with id=" + id
      });
    });
};

// Delete all Datatypes from the database.
exports.deleteAll = (req, res) => {
  Datatype.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Datatypes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all datatypes."
      });
    });
};

// find all published Datatypes
exports.findAllPublished = (req, res) => {
  Datatype.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving datatypes."
      });
    });
};
