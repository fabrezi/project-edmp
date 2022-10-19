module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    tsRequestNo: {
      type: Sequelize.STRING
    },
    orderText: {
      type: Sequelize.STRING
    },
    reasonText: {
      type: Sequelize.STRING
    },
    requestedById: {
      type: Sequelize.STRING
    },
    requestedAt: {
      type: Sequelize.DATE
    },
    productId: {
      type: Sequelize.INTEGER
    },
    accessModeId: {
      type: Sequelize.INTEGER
    },
    accessTypeId: {
      type: Sequelize.INTEGER
    },
    workTypeId: {
      type: Sequelize.INTEGER
    },
    piiRelatedFlag: {
      type: Sequelize.STRING
    },
    createdById: {
      type: Sequelize.STRING
    },
    updatedById: {
      type: Sequelize.STRING
    },
    lastActionInd: {
      type: Sequelize.STRING
    },
  }, {
    underscored: true
  });
  return Order;
};