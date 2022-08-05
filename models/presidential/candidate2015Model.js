const mongoose = require('mongoose')

const candidate2015Schema = new mongoose.Schema(
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

const Candidate2015 = mongoose.model('Candidate2015', candidate2015Schema);

module.exports = Candidate2015;