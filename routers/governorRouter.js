const express = require('express');
const { AddNewGovernor, getAllGovernors, updateGovernor, deleteGovernor, getGovernor, seedData } = require('../controllers/governorController');
const { isAuth, isAdmin } = require('../middleware/Auth');

const govRouter = express.Router();

//add many presidents data from json 
govRouter.get('/seed', seedData);

// get all Governor
govRouter.get('/', getAllGovernors);

// get single Governor
govRouter.get('/:id', getGovernor);

govRouter.post('/addgov', isAuth, isAdmin, AddNewGovernor)

// update Governor
govRouter.put('/:id', isAuth, isAdmin,updateGovernor);
  
  // delete governor
govRouter.delete('/:id', isAuth, isAdmin, deleteGovernor);
  
module.exports = govRouter;