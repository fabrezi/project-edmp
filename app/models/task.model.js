module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    number: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    ritm: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE
    },
    state: {
      type: Sequelize.STRING,
    },
    due: {
      type: Sequelize.DATE
    },
    assignmentGroup: {
      type: Sequelize.STRING
    },
    assignmentGroupManager: {
      type: Sequelize.STRING
    },
    assignedTo: {
      type: Sequelize.STRING
    },
  }, {
    underscored: true
  });
  return Task;
};