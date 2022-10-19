module.exports = (sequelize, Sequelize) => {
  const Form = sequelize.define("productIntake", {
    productName: {
      type: Sequelize.STRING
    },
    productDesc: {
      type: Sequelize.STRING
    },
    productType: {
      type: Sequelize.STRING
    },
    productURL: {
      type: Sequelize.STRING
    },
    // productImg: { //TODO images temporarily disabled
    //   type: Sequelize.STRING
    // },
    // imageConfirm: {
    //   type: Sequelize.BOOLEAN
    // },
    productTags: {
      type: Sequelize.STRING
    },
    productDomain: {
      type: Sequelize.STRING
    },
    stakeholderName: {
      type: Sequelize.STRING
    },
    productPII: {
      type: Sequelize.BOOLEAN
    },
    piiExplanation: {
      type: Sequelize.STRING
    },
    sampleFields: {
      type: Sequelize.STRING
    },
    sampleValues: {
      type: Sequelize.STRING
    },
    fulfillmentGroup: {
      type: Sequelize.STRING
    },
    requesterName: {
      type: Sequelize.STRING
    },
    requesterMail: {
      type: Sequelize.STRING
    },
    requesterID: {
      type: Sequelize.STRING
    },
  }, {
    underscored: true
  });
  return Form;
};