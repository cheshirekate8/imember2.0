'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    content: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
    dueTime: DataTypes.TIME,
    priority: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'userId' })
    Task.belongsTo(models.List, { foreignKey: 'listId' })
  };
  return Task;
};
