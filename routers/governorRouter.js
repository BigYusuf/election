const express =require('express');
const expressAsyncHandler = require('express-async-handler');
const Governor =require('../models/governorModel')

const govRouter = express.Router();

govRouter.get('/', expressAsyncHandler(async (req, res) => {
    const governor = await Governor.find({});
      res.send(governor);      
  })
);

govRouter.post('/addgov', expressAsyncHandler(async (req, res) => {
    const gov = new Governor({
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
    const createdGov = await gov.save();
      res.status(200).send(
        { 
            message: 'Governor Created', Governor_Election: createdGov });
  })
)
module.exports = govRouter;