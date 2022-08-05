const express = require('express');
const { getAllCandidate, getCandidate, addNewCandidate, updateCandidate, deleteCandidate, seedCandidateData } = require('../controllers/presidential/2015/presiCandidateController');
const { isAdmin, isAuth } = require('../middleware/Auth');

const presiCandidate2015Router = express.Router();

//add many candidates data from json 
presiCandidate2015Router.get('/seed', seedCandidateData);

//get all candidates
presiCandidate2015Router.get('/', getAllCandidate);

//get single candidate
presiCandidate2015Router.get('/:id', getCandidate);

presiCandidate2015Router.post('/addpresi', isAuth, isAdmin, addNewCandidate)

// update candidate
presiCandidate2015Router.put('/:id', isAuth, isAdmin, updateCandidate);

// delete candidate
presiCandidate2015Router.delete('/:id', isAuth, isAdmin, deleteCandidate);


module.exports = presiCandidate2015Router;