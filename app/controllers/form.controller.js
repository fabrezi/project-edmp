const path = require("path");
const uploadDir = "../../uploads/";
const formService = require("../services/form.service.js")

const db = require("../models");
const Form = db.forms;
const Op = db.Sequelize.Op;

// Find a single Form with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Form.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Form with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Form with id=" + id
      });
    });
};

// Find all Forms
exports.findAll = (req, res) => {
  Form.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Forms."
      });
    });
};

// Create and Save a new Form
exports.create = async (req, res) => {
  try {
    //Populate the form
    let form = req.body;
    //TODO images temporarily disabled
    // if (form.imageConfirm && form.imageConfirm.toLowerCase() == "true") {
    //   if (!req.file) {
    //     res.status(400).send({ message: "Image was confirmed but not provided" });
    //     return;
    //   }
    //   if (!formService.validateImageExt(req.file.originalname)) {
    //     res.status(400).send({ message: "Only .png and .jpg files are allowed!" });
    //     return;
    //   }
    //   try {
    //     form.productImg = await formService.uploadImage(req, res)
    //   } catch (err) {
    //     console.log("Error uploading image.", err.message, err.stack);
    //     res.status(500).send({
    //       message: "Error uploading image."
    //     });
    //     return;
    //   }
    // }

    //Validate the form
    const validationMessage = formService.validateForm(form);
    if (validationMessage) {
      res.status(400).send({
        message: validationMessage
      })
      return;
    }

    //TODO Excel disabled
    //Save form in Excel
    // try {
    //   form = await formService.saveFormToExcel(form);
    // } catch (err) {
    //   console.log("Error saving form.", err);
    //   res.status(500).send({
    //     message: "Error saving form."
    //   });
    // }

    // try {
    //   await formService.uploadExcel();
    //   res.send(form);
    // } catch (err) {
    //   console.log("Error uploading form.", err);
    //   res.status(500).send({
    //     message: "Error uploading form."
    //   });
    // }

    // Save Form in the database
    Form.create(form)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Form."
        });
      });
  } catch (err) {
    console.log("Uncaught error while creating form", err.message, err);
    res.status(500).send({ message: "Some error occurred while creating the Form." })
  }
}

// Update a Form by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  //Populate the form
  const form = req.body;
  if (form.imageConfirm === true) {
    const imagePath = formService.uploadImage(req, res);
    form.productImg = imagePath;
  }

  //Validate the form
  const validationMessage = formService.validateForm(form);
  if (validationMessage) {
    res.status(500).send({
      message: validationMessage
    })
  }

  Form.update(form, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Form with id=${id}. Maybe Form was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Form with id=" + id + err
      });
    });
};

// Delete a Form with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Form.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Form with id=${id}. Maybe Form was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Form with id=" + id
      });
    });
};

// Delete all Forms from the database.
exports.deleteAll = (req, res) => {
  Form.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Forms were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Forms."
      });
    });
};