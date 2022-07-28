const express = require('express');
const { getAllState, getState, addNewState, updateState, deleteState, seedStateData } = require('../controllers/presiStateInfoController');
const { isAdmin, isAuth } = require('../middleware/Auth');

const presiStateRouter = express.Router();

//add many States data from json 
presiStateRouter.get('/seed', seedStateData);

//get all States
presiStateRouter.get('/', getAllState);

//get single State
presiStateRouter.get('/', getState);

presiStateRouter.post('/addpresi', isAuth, isAdmin, addNewState)

// update State
presiStateRouter.put('/:id', isAuth, isAdmin, updateState);

// delete State
presiStateRouter.delete('/:id', isAuth, isAdmin, deleteState);


module.exports = presiStateRouter;