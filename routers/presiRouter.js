const express = require('express');
const { deletePresi, getAllPresi, addNewPresi, updatePresi, getPresi, seedDataPresi } = require('../controllers/presidential/2019/presiController');
const { isAdmin, isAuth } = require('../middleware/Auth');

const presiRouter = express.Router();

//add many presidents data from json 
presiRouter.get('/seed', seedDataPresi);

//get all presidents
presiRouter.get('/', getAllPresi);

//get single president
presiRouter.get('/:id', getPresi);

presiRouter.post('/addpresi', isAuth, isAdmin, addNewPresi)

// update president
presiRouter.put('/:id', isAuth, isAdmin, updatePresi);

// delete president
presiRouter.delete('/:id', isAuth, isAdmin, deletePresi);


module.exports = presiRouter;