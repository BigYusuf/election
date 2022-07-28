const express = require('express');
const { getAllCandidate, getCandidate, addNewCandidate, updateCandidate, deleteCandidate, seedCandidateData } = require('../controllers/presiCandidateController');
const { isAdmin, isAuth } = require('../middleware/Auth');

const presiCandidateRouter = express.Router();

//add many candidates data from json 
presiCandidateRouter.get('/seed', seedCandidateData);

//get all candidates
presiCandidateRouter.get('/', getAllCandidate);

//get single candidate
presiCandidateRouter.get('/', getCandidate);

presiCandidateRouter.post('/addpresi', isAuth, isAdmin, addNewCandidate)

// update candidate
presiCandidateRouter.put('/:id', isAuth, isAdmin, updateCandidate);

// delete candidate
presiCandidateRouter.delete('/:id', isAuth, isAdmin, deleteCandidate);


module.exports = presiCandidateRouter;