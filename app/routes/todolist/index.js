const todolistRoute = require('express').Router();
const todolistController = require('../../controller/todolistController');

module.exports = (app) => {

  todolistRoute.post('/todolist',  todolistController.create);
  todolistRoute.put('/todolist/:id',  todolistController.update);
  todolistRoute.delete('/todolist/:id', todolistController.delete);
  app.use('/api/v1', todolistRoute);
};
