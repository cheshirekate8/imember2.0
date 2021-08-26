'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tasks', [
      { content: 'Milk', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Eggs', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Bread', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Clean the Kitchen', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Wash the Car', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false},
      { content: 'Do Homework', list_Id: 1, user_Id: 1, dueDate: null, dueTime: null, complete: false }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tasks', null, {});
  }
};
