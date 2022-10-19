module.exports = (sequelize, Sequelize) => {
  const Steward = sequelize.define("data_stewards", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  }, {
    underscored: true
  });

  return Steward;
};
