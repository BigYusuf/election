
const expressAsyncHandler = require('express-async-handler');
const Presidential2015 = require('../../../models/presidential/presi2015Model');
const electionData = require('../../../data/presidential/electionData2015');

exports.seedDataPresi = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
    await Presidential2015.remove({});

    const createdPresi = await Presidential2015.insertMany(electionData.election2015);
    res.send({ createdPresi});
})

exports.getAllPresi = expressAsyncHandler(async (req, res) => {
    const president = await Presidential2015.find({});
      res.send(president);      
})

exports.getPresi = expressAsyncHandler(async (req, res) => {
    const presi = await Presidential2015.findById(req.params.id);
    if (presi) {
      res.send(presi);
    } else {
      res.status(404).send({ message: 'State data Not Found' });
    }
})

exports.addNewPresi = expressAsyncHandler(async (req, res) => {
    const presi = new Presidential2015({
      state: req.body.state,
      type: req.body.type,
      year: req.body.year,
      stateInfo: req.body.stateInfo,
    });
    const createdPresi = await presi.save();
      res.status(200).send(
        {
            message: 'State data(president) Created', Presidential2015_Election: createdPresi 
        });
})

exports.updatePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential2015.findById(presidentId);
    
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
        res.send({ message: 'State data(president) Updated', president: updatedPresident });
      }else{
        res.status(404).send({ message: 'State data Not Found' })
      }
})

exports.deletePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential2015.findById(presidentId);
    if(president) {
        const deletePresident = await president.remove(); 
        res.send({ message: 'State data(president) Deleted', president: deletePresident });
    }else{
      res.status(404).send({ message: 'State data Not Found' })
    }
})