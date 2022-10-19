module.exports = (sequelize, Sequelize) => {
  const Datatype = sequelize.define("datatype", {
    label: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
  }, {
    underscored: true
  });

  return Datatype;
};
