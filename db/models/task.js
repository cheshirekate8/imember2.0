'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    content: DataTypes.STRING,
    list_Id: DataTypes.INTEGER,
    user_Id: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    priority: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'user_Id' })
    Task.belongsTo(models.List, { foreignKey: 'list_Id' })
  };
  return Task;
};
