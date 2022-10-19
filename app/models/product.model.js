module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    sku: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    shortDesc: {
      type: Sequelize.STRING(4000)
    },
    description: {
      type: Sequelize.STRING(4000)
    },
    categories: {
      type: Sequelize.STRING
    },
    datatype: {
      type: Sequelize.STRING
    },
    datatypePath: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.STRING
    },
    ownerEmail: {
      type: Sequelize.STRING
    },
    poc: {
      type: Sequelize.STRING
    },
    pocEmail: {
      type: Sequelize.STRING
    },
    classification: {
      type: Sequelize.STRING
    },
    intendedUse: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    key: {
      type: Sequelize.STRING
    },
    adGroup: {
      type: Sequelize.STRING
    },
    tbdpPricing: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING
    },
    ratingAvg: {
      type: Sequelize.INTEGER
    },
    ratingQa: {
      type: Sequelize.INTEGER
    },
    ratingEase: {
      type: Sequelize.INTEGER
    },
    ratingUserable: {
      type: Sequelize.INTEGER
    },
    ratingValue: {
      type: Sequelize.INTEGER
    },
    userType: {
      type: Sequelize.STRING
    },
    accessType: {
      type: Sequelize.STRING
    },
    dataAccessType: {
      type: Sequelize.STRING
    },
    platform: {
      type: Sequelize.STRING
    },
    routeIdentifier: {
      type: Sequelize.STRING
    },
    env: {
      type: Sequelize.STRING
    },
    pii: {
      type: Sequelize.STRING
    },
    hideMe: {
      type: Sequelize.STRING
    },
    freq: {
      type: Sequelize.STRING
    },
    max: {
      type: Sequelize.STRING
    },
    avail: {
      type: Sequelize.STRING
    },
    resourceUrl: {
      type: Sequelize.STRING(4000)
    },
    followed: {
      type: Sequelize.STRING
    },
    preorderTmna: {
      type: Sequelize.STRING
    },
    preorderTmc: {
      type: Sequelize.STRING
    },
    preorderWovenPlanet: {
      type: Sequelize.STRING
    },
    preorderMtmus: {
      type: Sequelize.STRING
    },
    preorderTfs: {
      type: Sequelize.STRING
    },
    preorderTcna: {
      type: Sequelize.STRING
    },
    preorderTci: {
      type: Sequelize.STRING
    },
    dataA: {
      type: Sequelize.STRING
    },
    valueA: {
      type: Sequelize.STRING(4000)
    },
    dataB: {
      type: Sequelize.STRING
    },
    valueB: {
      type: Sequelize.STRING(4000)
    },
    dataC: {
      type: Sequelize.STRING
    },
    valueC: {
      type: Sequelize.STRING(4000)
    },
    dataD: {
      type: Sequelize.STRING
    },
    valueD: {
      type: Sequelize.STRING(4000)
    },
    dataE: {
      type: Sequelize.STRING
    },
    valueE: {
      type: Sequelize.STRING(4000)
    },
    dataF: {
      type: Sequelize.STRING
    },
    valueF: {
      type: Sequelize.STRING(4000)
    },
    dataG: {
      type: Sequelize.STRING
    },
    valueG: {
      type: Sequelize.STRING(4000)
    },
    dataH: {
      type: Sequelize.STRING
    },
    valueH: {
      type: Sequelize.STRING(4000)
    },
    dataI: {
      type: Sequelize.STRING
    },
    valueI: {
      type: Sequelize.STRING(4000)
    },
  }, {
    underscored: true
  });

  return Product;
};