'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING(50),
    email: DataTypes.STRING(254),
    hashed_password: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.List, { foreignKey: 'userId' })
    User.hasMany(models.Task, { foreignKey: 'userId' })
  };
  return User;
};
