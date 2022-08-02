
const expressAsyncHandler = require('express-async-handler');
const CandidateInfo =require('../../../models/presidential/2019/candidateInfoModel');
const candidateData = require('../../../data/presidential/candidate_presidential2019');

exports.seedCandidateData = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
    await CandidateInfo.remove({});

    const createdCandidate = await CandidateInfo.insertMany(candidateData.candidates);
    res.send({createdCandidate});
   // console.log(candidateData.candidates)
})

exports.getAllCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = await CandidateInfo.find({});
      res.send(candidate);      
})

exports.getCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = await CandidateInfo.findById(req.params.id);
    if (candidate) {
      res.send(candidate);
    } else {
      res.status(404).send({ message: 'Candidate Not Found' });
    }
})

exports.addNewCandidate = expressAsyncHandler(async (req, res) => {
    const candidate = new CandidateInfo({
      type: req.body.type,
      year: req.body.year,
      party: req.body.party,
      candidate: req.body.candidate,
      runningMate: req.body.runningMate,
    });
    const createdCandidate = await candidate.save();
      res.status(200).send(
        {
            message: 'Candidate Created', CandidateInfo_Election: createdCandidate 
        });
})

exports.updateCandidate = expressAsyncHandler(async (req, res) => {
    const candidateId = req.params.id;
    const candidate = await CandidateInfo.findById(candidateId);
    
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
    const candidate = await CandidateInfo.findById(candidateId);
    if(candidate) {
        const deletedCandidate = await candidate.remove(); 
        res.send({ message: 'Candidate Deleted', candidate: deletedCandidate });
    }else{
      res.status(404).send({ message: 'Candidate Not Found' })
    }
})