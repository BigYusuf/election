const express = require('express');
const { deletePresi, getAllPresi, addNewPresi, updatePresi, getPresi } = require('../controllers/presiController');
const { isAdmin, isAuth } = require('../utils/utils');

const presiRouter = express.Router();

//get all presidents
presiRouter.get('/', getAllPresi);

//get single president
presiRouter.get('/', getPresi);

presiRouter.post('/addpresi', isAuth, isAdmin, addNewPresi)

// update president
presiRouter.put('/:id', isAuth, isAdmin, updatePresi);

// delete president
presiRouter.delete('/:id', isAuth, isAdmin, deletePresi);


module.exports = presiRouter;