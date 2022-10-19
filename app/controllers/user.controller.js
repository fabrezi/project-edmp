const msalService = require("../services/msal.service");

// Find users based on search parameters
exports.search = async (req, res) => {
  try {
    const response = await msalService.searchUsers(req.query);
    const data = response.data;
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send(err.message);
  }
};

exports.nextLink = async (req, res) => {
  try {
    if (req.query.nextLink) {
      try {
        const response = await msalService.callApi(req.query.nextLink);
        const data = response.data;
        res.send(data);
      } catch (err) {
        res.status(400).send({
          message: "Error while contacting nextLink API: " + err.response.data.error.message,
          code: err.response.data.error.code
        });
        return
      }
    }
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send(err.message);
  }
};