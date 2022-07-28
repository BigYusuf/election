
const expressAsyncHandler = require('express-async-handler');
const StateInfo =require('../models/presidential/stateInfoModel');
const stateData = require('../data/presidential/state_presidential2019');

exports.seedStateData = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
    await StateInfo.remove({});

    const createdState = await StateInfo.insertMany(stateData.statedata);
    res.send({createdState});
})

exports.getAllState = expressAsyncHandler(async (req, res) => {
    const state = await StateInfo.find({});
      res.send(state);      
})

exports.getState = expressAsyncHandler(async (req, res) => {
    const state = await StateInfo.findById(req.params.id);
    if (state) {
      res.send(state);
    } else {
      res.status(404).send({ message: 'State Not Found' });
    }
})

exports.addNewState = expressAsyncHandler(async (req, res) => {
    const state = new StateInfo({
      type: req.body.type,
      year: req.body.year,
      party: req.body.party,
      state: req.body.state,
      runningMate: req.body.runningMate,
    });
    const createdState = await state.save();
      res.status(200).send(
        {
            message: 'State Created', StateInfo_Election: createdState 
        });
})

exports.updateState = expressAsyncHandler(async (req, res) => {
    const stateId = req.params.id;
    const state = await StateInfo.findById(stateId);
    
      if(state) {
        state.party = req.body.party;
        state.type = req.body.type;
        state.year = req.body.year;
        state.state = req.body.state;
        state.runningMate = req.body.runningMate;
        
        const updatedState = await state.save();
        res.send({ message: 'State Updated', state: updatedState });
      }else{
        res.status(404).send({ message: 'State Not Found' })
      }
})

exports.deleteState = expressAsyncHandler(async (req, res) => {
    const stateId = req.params.id;
    const state = await StateInfo.findById(stateId);
    if(state) {
        const deletedState = await state.remove(); 
        res.send({ message: 'State Deleted', state: deletedState });
    }else{
      res.status(404).send({ message: 'State Not Found' })
    }
})