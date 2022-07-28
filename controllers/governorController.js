
const expressAsyncHandler = require('express-async-handler');
const Governor =require('../models/governor/governorModel');
const data = require('../data/data.js');

exports.seedDataGov = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
    await Governor.remove({});

    const createdGov = await Governor.insertMany(data.governor);
    res.send({ createdGov});
})
exports.AddNewGovernor = expressAsyncHandler(async (req, res) => {
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
        { message: 'New Governor Created', Governor_Election: createdGov });
})

exports.getAllGovernors = expressAsyncHandler(async (req, res) => {
const governor = await Governor.find({});
    res.send(governor);      
})
exports.getGovernor = expressAsyncHandler(async (req, res) => {
    const gov = await Governor.findById(req.params.id);
    if (gov) {
      res.send(gov);
    } else {
      res.status(404).send({ message: 'Governor Not Found' });
    }
  })
exports.updateGovernor =  expressAsyncHandler(async (req, res) => {
    const governorId = req.params.id;
    const governor = await Governor.findById(governorId);
    
      if(governor) {
        governor.party = req.body.party;
        governor.state = req.body.state;
        governor.type = req.body.type;
        governor.year = req.body.year;
        governor.partyInfo = req.body.partyInfo;
        governor.stateInfo = req.body.stateInfo;
        governor.candidateInfo = req.body.candidateInfo;
        governor.validVotes = req.body.validVotes;
        governor.invalidVotes = req.body.invalidVotes;
        governor.totalVotes = req.body.totalVotes;
        
        const updatedGovernor = await governor.save();
        res.send({ message: 'Governor Updated', governor: updatedGovernor });
      }else{
        res.status(404).send({ message: 'Governor Not Found' })
      }
  })
exports.deleteGovernor = expressAsyncHandler(async (req, res) => {
    const governorId = req.params.id;
    const governor = await Governor.findById(governorId);
    if(governor) {
        const deleteGovernor = await governor.remove(); 
        res.send({ message: 'Governor Deleted', governor: deleteGovernor });
    }else{
      res.status(404).send({ message: 'Governor Not Found' })
    }
})