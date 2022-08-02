const express = require('express');
const { deletePresi, getAllPresi, addNewPresi, updatePresi, getPresi, seedDataPresi } = require('../controllers/presidential/2015/presiController');
const { isAdmin, isAuth } = require('../middleware/Auth');

const presi2015Router = express.Router();

//add many presidents data from json 
presi2015Router.get('/seed', seedDataPresi);

//get all presidents
presi2015Router.get('/', getAllPresi);

//get single president
presi2015Router.get('/:id', getPresi);

presi2015Router.post('/addpresi', isAuth, isAdmin, addNewPresi)

// update president
presi2015Router.put('/:id', isAuth, isAdmin, updatePresi);

// delete president
presi2015Router.delete('/:id', isAuth, isAdmin, deletePresi);


module.exports = presi2015Router;