const { Sequelize } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

updateRequest = async () => {
  const requests = require("../controllers/request.controller.js");
  const filter = {
    ritmState: "Open",
    openedAt: {
      [Op.gte]: "2022-06-22 00:00:00.000 -0400"
    }
  };
  const ids = await requests.findWithFilter(filter);
  console.log("--------UPDATING-----------");
  console.log("number of requests: " + ids.length);
  if (ids != null && ids.length > 0) {
    requests.fetchAndUpdate(ids);
  }
}

exports.initTimer = (sec) => {
  setInterval(updateRequest, 1000 * sec);
}


