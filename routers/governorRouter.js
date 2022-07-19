const express = require('express');
const { AddNewGovernor, getAllGovernors, updateGovernor, deleteGovernor, getGovernor } = require('../controllers/governorController');
const { isAuth, isAdmin } = require('../utils/utils');

const govRouter = express.Router();

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