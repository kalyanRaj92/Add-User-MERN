const express = require('express');
const route = express.Router();

const userController = require('../controllers/userController');

route.post('/create', userController.createUser);
route.get('/getall', userController.getAllUsers);
route.get('/getOne/:id', userController.getOneUser);
route.put('/update/:id', userController.updateUser);
route.delete('/delete/:id', userController.deleteUser);


module.exports  = route;