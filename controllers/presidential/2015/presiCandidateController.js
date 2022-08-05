
const expressAsyncHandler = require('express-async-handler');
const Candidate2015 =require('../../../models/presidential/candidate2015Model');
const candidateData = require('../../../data/presidential/candidate_presi2015');

exports.seedCandidateData = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
    await Candidate2015.remove({});

    const createdCandidate = await Candidate2015.insertMany(candidateData.candidates);
    res.send({createdCandidate});
   // console.log(candidateData.candidates)
})

exports.getAllCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = await Candidate2015.find({});
      res.send(candidate);      
})

exports.getCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = await Candidate2015.findById(req.params.id);
    if (candidate) {
      res.send(candidate);
    } else {
      res.status(404).send({ message: 'Candidate Not Found' });
    }
})

exports.addNewCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = new Candidate2015({
      type: req.body.type,
      year: req.body.year,
      party: req.body.party,
      candidate: req.body.candidate,
      runningMate: req.body.runningMate,
    });
    const createdCandidate = await candidate.save();
      res.status(200).send(
        {
            message: 'Candidate Created', Candidate2015_Election: createdCandidate 
        });
})

exports.updateCandidate = expressAsyncHandler(async (req, res) => {
    const candidateId = req.params.id;
    const candidate = await Candidate2015.findById(candidateId);
    
      if(candidate) {
        candidate.party = req.body.party;
        candidate.type = req.body.type;
        candidate.year = req.body.year;
        candidate.candidate = req.body.candidate;
        candidate.runningMate = req.body.runningMate;
        
        const updatedCandidate = await candidate.save();
        res.send({ message: 'Candidate Updated', candidate: updatedCandidate });
      }else{
        res.status(404).send({ message: 'Candidate Not Found' })
      }
})

exports.deleteCandidate = expressAsyncHandler(async (req, res) => {
    const candidateId = req.params.id;
    const candidate = await Candidate2015.findById(candidateId);
    if(candidate) {
        const deletedCandidate = await candidate.remove(); 
        res.send({ message: 'Candidate Deleted', candidate: deletedCandidate });
    }else{
      res.status(404).send({ message: 'Candidate Not Found' })
    }
})