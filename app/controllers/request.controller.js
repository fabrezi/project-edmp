const requestService = require("../services/request.service.js")
var dueService = require("../services/moment-due-date");

const db = require("../models");
const Request = db.requests;
const Task = db.tasks;
const Product = db.products;
const Op = db.Sequelize.Op;

exports.updateEventRequests = async (req, res) => {
  let responses = [];
  try {
    responses = await requestService.getRequestDetails({ requestId: req.body });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send(err);
    return;
  }

  let tasks = [];
  for (const response of responses) {
    if (response.taskData) {
      for (const task of response.taskData) {
        tasks.push(task);
      }
    }
  }

  try {
    const requestProps = Object.keys(Request.tableAttributes);
    requestService.removeElement(requestProps, "createdAt");
    requestService.removeElement(requestProps, "objectId");
    requestService.removeElement(requestProps, "productId");

    const taskProps = Object.keys(Task.tableAttributes);
    requestService.removeElement(taskProps, "createdAt");

    await Request.bulkCreate(responses, { updateOnDuplicate: requestProps, validate: true, returning: false });
    await Task.bulkCreate(tasks, { updateOnDuplicate: taskProps, validate: true, returning: false });
    res.send({ message: "Records updated successfully." });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({
      message:
        err
    });
    return;
  }
}

exports.findAndSaveRequests = async (req, res) => {
  let responses = [];
  try {
    responses = await requestService.findAndSaveRequests(req.query);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send(err);
    return;
  }

  let tasks = [];
  for (const response of responses) {
    if (response.taskData) {
      for (const task of response.taskData) {
        tasks.push(task);
      }
    }
  }

  try {
    const results = await Request.bulkCreate(responses, { ignoreDuplicates: true, validate: true });
    await Task.bulkCreate(tasks, { ignoreDuplicates: true, validate: true });
    res.send(results);
  } catch (err) {
    console.log("error", err);
    res.status(500).send({
      message:
        err
    });
    return;
  }
}

// save request with product id in databse
exports.saveRequestWithProduct = async (req, res) => {
  // Validate request
  if (!req.body.requestNum) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.body.requestNum;
  const product_id = req.body.productId;
  const object_id = req.body.objectId;
  Request.findByPk(id)
    .then(item => {
      if (item) {
        // Update one
        Request.update({
          objectId: object_id,
          productId: product_id
        }, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: `Request ${id} updates product id ${product_id} successfully.`
              });
            } else {
              res.status(404).send({
                message: `Request with ID ${id} not found.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Request with id=" + id + " with " + err
            });
          });

      } else {
        // Create one
        Request.create({
          id: id,
          objectId: object_id,
          productId: product_id,
          stage: "Waiting for Approval",
          approvalStage: "Requested",
          ritmState: "Open",
          openedAt: "2022-06-22 00:00:00.000 -0400"
        })
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Request with ID ${id} not found.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error Request with id=" + id
            });
          });
      }
    });

  return;
}

exports.loadProducts = async (req, res) => {
  // when request stage is waiting for approval
  // add due for request
  // due date is open at + DUE_DAY_OFFSET days
  const DUE_DAY_OFFSET = 2;
  // Validate request
  if (!req.query.requestedFor) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Request.findAll({
    where: {
      object_id: req.query.requestedFor
    },
    // load task and products together here
    include: {
      all: true,
    }
  })
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        if (data[i]["stage"] == "Waiting for Approval") {
          var date = new Date(data[i]["openedAt"]);
          var due = dueService.calculate_due_date(date, DUE_DAY_OFFSET);
          data[i].setDataValue("due", due);
        }
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving domains."
      });
    });
}

exports.findAll = (req, res) => {
  var condition = null;
  if (req.query.objectId != null) {
    condition = {
      object_id: req.query.objectId,
    }
  }
  Request.findAll({ where: condition })
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

exports.findWithFilter = async (filter) => {
  var ids = await Request.findAll({
    raw: true,
    where: filter,
    attributes: ['id']
  })
    .map(element => element["id"])
    .catch(err => {
      console.log(err.message);
      return;
    });
  return ids;
};

exports.fetchAndUpdate = async (ids) => {
  let responses = [];
  try {
    responses = await requestService.getRequestDetails({ requestId: ids });
  } catch (err) {
    console.log(err);
    return;
  }

  let tasks = [];
  for (const response of responses) {
    if (response.taskData) {
      for (const task of response.taskData) {
        tasks.push(task);
      }
    }
  }

  try {
    const requestProps = Object.keys(Request.tableAttributes);
    requestService.removeElement(requestProps, "createdAt");
    requestService.removeElement(requestProps, "objectId");
    requestService.removeElement(requestProps, "productId");

    const taskProps = Object.keys(Task.tableAttributes);
    requestService.removeElement(taskProps, "createdAt");

    await Request.bulkCreate(responses, { updateOnDuplicate: requestProps, validate: true, returning: false });
    await Task.bulkCreate(tasks, { updateOnDuplicate: taskProps, validate: true, returning: false });

  } catch (err) {
    console.log("error", err.message);
    return;
  }
}
