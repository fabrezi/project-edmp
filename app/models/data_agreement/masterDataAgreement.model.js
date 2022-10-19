module.exports = (sequelize, Sequelize) => {
  const MasterDataAgreement = sequelize.define("masterDataAgreement", {
  }, {
    underscored: true
  });
  return MasterDataAgreement;
};