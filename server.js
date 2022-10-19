require("dotenv").config();

const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: process.env.UI_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.sequelize.sync();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", express.static("public"))
// app.get("/", (req, res) => {
//   res.json({ message: "Global Data Marketplace Backend Server!" });
// });

//TODO development incomplete
// require("./app/routes/steward.routes")(app);
// require("./app/routes/datatype.routes")(app);
// require("./app/routes/classification.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/form.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/request.routes")(app);
require("./app/routes/domain.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//this is to update the db after an interval
// const MIN_TO_UPDATE = 0;
// const SEC_TO_UPDATE = 10;
// const TIME_TO_UPDATE = SEC_TO_UPDATE + 60 * MIN_TO_UPDATE;
// const timer = require("./app/services/timer.service");
// timer.initTimer(TIME_TO_UPDATE);