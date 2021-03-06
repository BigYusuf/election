
const expressAsyncHandler = require('express-async-handler');
const Presidential =require('../models/presidentialModel');
const data = require('../data.js');

exports.seedData = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
   // await Presidential.remove({});

    //const createdPresi = await User.insertMany(data.president);
   // res.send({ createdPresi});
})

exports.getAllPresi = expressAsyncHandler(async (req, res) => {
    const president = await Presidential.find({});
      res.send(president);      
})

exports.getPresi = expressAsyncHandler(async (req, res) => {
    const presi = await Presidential.findById(req.params.id);
    if (presi) {
      res.send(presi);
    } else {
      res.status(404).send({ message: 'President Not Found' });
    }
})

exports.addNewPresi = expressAsyncHandler(async (req, res) => {
    const presi = new Presidential({
      party: req.body.party,
      state: req.body.state,
      type: req.body.type,
      year: req.body.year,
      vote: req.body.vote,
      partyInfo: req.body.partyInfo,
      stateInfo: req.body.stateInfo,
      candidateInfo: req.body.candidateInfo,
    });
    const createdPresi = await presi.save();
      res.status(200).send(
        {
            message: 'Presi Created', Presidential_Election: createdPresi 
        });
})

exports.updatePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential.findById(presidentId);
    
      if(president) {
        president.party = req.body.party;
        president.state = req.body.state;
        president.type = req.body.type;
        president.year = req.body.year;
        president.partyInfo = req.body.partyInfo;
        president.stateInfo = req.body.stateInfo;
        president.candidateInfo = req.body.candidateInfo;
        president.validVotes = req.body.validVotes;
        president.invalidVotes = req.body.invalidVotes;
        president.totalVotes = req.body.totalVotes;
        
        const updatedPresident = await president.save();
        res.send({ message: 'President Updated', president: updatedPresident });
      }else{
        res.status(404).send({ message: 'President Not Found' })
      }
})

exports.deletePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential.findById(presidentId);
    if(president) {
        const deletePresident = await president.remove(); 
        res.send({ message: 'President Deleted', president: deletePresident });
    }else{
      res.status(404).send({ message: 'President Not Found' })
    }
})