const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING && process.env.DB_LOGGING.toLowerCase() === "false" ? false : true,

  pool: {
    max: +process.env.DB_POOL_MAX,
    min: +process.env.DB_POOL_MIN,
    acquire: +process.env.DB_POOL_ACQUIRE,
    idle: +process.env.DB_POOL_IDLE
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//TODO development incomplete
// db.data_stewards = require("./steward.model.js")(sequelize, Sequelize);
// db.datatypes = require("./datatype.model.js")(sequelize, Sequelize);
// db.classifications = require("./classification.model.js")(sequelize, Sequelize);
// db.orders = require("./order.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.forms = require("./form.model.js")(sequelize, Sequelize);
db.requests = require("./request.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.data_agreements = require("./data_agreement/index.js")(sequelize, Sequelize);
db.domains = require("./domain.model.js")(sequelize, Sequelize);

//TODO can make associations file for this
db.requests.hasOne(db.tasks, { foreignKey: { allowNull: false } });
db.tasks.belongsTo(db.requests, { foreignKey: { allowNull: false } });

db.data_agreements.masterDataAgreement.belongsTo(db.products, { foreignKey: { allowNull: false } });
db.products.hasOne(db.data_agreements.masterDataAgreement, { foreignKey: { allowNull: false } });

db.products.belongsTo(db.domains, { foreignKey: { allowNull: true } });
db.domains.hasOne(db.products, { foreignKey: { allowNull: true } });

db.requests.belongsTo(db.products, { foreignKey: { allowNull: true } });
db.products.hasOne(db.requests, { foreignKey: { allowNull: true } });

module.exports = db;
