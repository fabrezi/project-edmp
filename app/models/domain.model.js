module.exports = (sequelize, Sequelize) => {
  const Domain = sequelize.define("domain", {
    domain_name1: {
      type: Sequelize.STRING
    },
    domain_name2: {
      type: Sequelize.STRING
    },
    domain_name3: {
      type: Sequelize.STRING
    },
    domain_name4: {
      type: Sequelize.STRING
    },
    domain_name5: {
      type: Sequelize.STRING
    },
    domain_path1: {
      type: Sequelize.STRING
    },
    domain_path2: {
      type: Sequelize.STRING
    },
    domain_path3: {
      type: Sequelize.STRING
    },
    domain_path4: {
      type: Sequelize.STRING
    },
    domain_path5: {
      type: Sequelize.STRING
    },
    one_ts_domain: {
      type: Sequelize.STRING
    },
    owner_name: {
      type: Sequelize.STRING
    },
    owner_email: {
      type: Sequelize.STRING
    },
    control_group_key: {
      type: Sequelize.STRING
    },
  }, {
    underscored: true
  });
  return Domain;
}