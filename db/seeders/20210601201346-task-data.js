'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tasks', [
      { content: 'Milk', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Eggs', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Bread', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Clean the Kitchen', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false },
      { content: 'Wash the Car', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false},
      { content: 'Do Homework', listId: 1, userId: 1, dueDate: null, dueTime: null, complete: false }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tasks', null, {});
  }
};
