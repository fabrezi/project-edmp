const db = require("../models");
const Domain = db.domains;

//Create one Domain in the database.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.domain_name1) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create domain object
  const domain = {
    domain_name1: req.body.domain_name1,
    domain_name2: req.body.domain_name2,
    domain_name3: req.body.domain_name3,
    domain_name4: req.body.domain_name4,
    domain_name5: req.body.domain_name5,
    domain_path1: req.body.domain_path1,
    domain_path2: req.body.domain_path2,
    domain_path3: req.body.domain_path3,
    domain_path4: req.body.domain_path4,
    domain_path5: req.body.domain_path5,
    one_ts_domain: req.body.one_ts_domain,
    owner_name: req.body.owner_name,
    owner_email: req.body.owner_email,
    control_group_key: req.body.control_group_key,
  };

  // Save domain in Domain db
  Domain.create(domain)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Domain."
      });
    });
};

// Retrieve all Domains from the database.
exports.findAll = (req, res) => {
  Domain.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving domains."
      });
    });
};

// Find a single Domain with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Domain.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Domain with ID ${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Domain with id=" + id
      });
    });
};

// Update a Domain by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Domain.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Domain was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Domain with ID ${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Domain with id=" + id
      });
    });
};

// Delete a Domains with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Domain.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Domains was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Domain with ID ${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Domains with id=" + id
      });
    });
};

// Delete all Domains from the database.
exports.deleteAll = (req, res) => {
  Domain.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Domains were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Domains."
      });
    });
};