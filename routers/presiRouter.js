const express =require('express');
const expressAsyncHandler = require('express-async-handler');
const Presidential =require('../models/presidentialModel')

const presiRouter = express.Router();

presiRouter.get('/', expressAsyncHandler(async (req, res) => {
    const president = await Presidential.find({});
      res.send(president);      
  })
);

presiRouter.post('/addpresi', expressAsyncHandler(async (req, res) => {
    const presi = new Presidential({
      party: req.body.party,
      state: req.body.state,
      type: req.body.type,
      year: req.body.year,
      PartyInfo: req.body.PartyInfo,
      stateInfo: req.body.stateInfo,
      candidateInfo: req.body.candidateInfo,
      validVotes: req.body.validVotes,
      invalidVotes: req.body.invalidVotes,
      totalVotes: req.body.totalVotes,
    });
    const createdPresi = await presi.save();
      res.status(200).send(
        { 
            message: 'Presi Created', Presidential_Election: createdPresi });
  })
)
module.exports = presiRouter;