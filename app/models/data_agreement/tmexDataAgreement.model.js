module.exports = (sequelize, Sequelize) => {
  const TMEXDataAgreement = sequelize.define("tmexDataAgreement", {
    hasMda: {
      type: Sequelize.BOOLEAN,
    },
    mdaContractNumber: {
      type: Sequelize.STRING,
    },
    mdaExpirationDate: {
      type: Sequelize.DATE
    },
    hasDsa: {
      type: Sequelize.BOOLEAN
    },
    dsaContractNumber: {
      type: Sequelize.STRING,
    },
    dsaExpirationDate: {
      type: Sequelize.DATE
    },
    regulatoryControlNeeded: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    underscored: true
  });
  return TMEXDataAgreement;
};