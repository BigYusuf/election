const mongoose = require('mongoose')

const candidateInfoSchema = new mongoose.Schema(
    {    
        party: String,
        year: String,
        type: String,
        votes: Number,
        partyInfo: {
            name: { type: String},
            iso: { type: String},
            logo: { type: String},
            founded: { type: String},
        },
        candidate: { 
            name: String,
            image: String,
            gender: String,
            age: Number,
            qualification: String,
        },
        runningMate: { 
            name: String,
            image: String,
            gender: String,
            age: Number,
            qualification: String,
        },   
    },
    {
        timestamps: true,
    }
)

const CandidateInfo = mongoose.model('CandidateInfo', candidateInfoSchema);

module.exports = CandidateInfo;