module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define("request", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    objectId: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.STRING
    },
    closedAt: {
      type: Sequelize.STRING
    },
    ritmState: {
      type: Sequelize.STRING
    },
    requestedFor: {
      type: Sequelize.STRING
    },
    openedBy: {
      type: Sequelize.STRING
    },
    openedAt: {
      type: Sequelize.DATE
    },
    ritmAssignedTo: {
      type: Sequelize.STRING
    },
    approvalStage: {
      type: Sequelize.STRING
    },
    stage: {
      type: Sequelize.STRING
    },
    ritmComments: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000))
    },
    ritmApprovers: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000))
    },
    variables: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000))
    },
  }, {
    underscored: true
  });
  return Request;
};