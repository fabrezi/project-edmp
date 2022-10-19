module.exports = (sequelize, Sequelize) => {
  const Classification = sequelize.define("classification", {
    label: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
  }, {
    underscored: true
  });

  return Classification;
};
