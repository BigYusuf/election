const mongoose = require('mongoose')

const stateInfoSchema = new mongoose.Schema(
    {    
        name: { type: String},
        electionType: { type: String},
        logo: { type: String},
        lga: { type: Number, default: 0},
        population: { type: Number, default: 0},
        iso: { type: String},
        lat: { type: Number, default: 0},
        long: { type: Number, default: 0},
        registeredVoters: { type: Number, default: 0},
        accreditedVoters: { type: Number, default: 0},
        totalvalidVotes: { type: Number, default: 0},
        rejectedVotes: { type: Number, default: 0},
        totalVotes: { type: Number, default: 0},
        canceledVotes: { 
            totalAffectedLG: String,
            totalAffectedPollingUnits: Number,
            totalAffectedVoters: Number,
            reasons: String,
        },       
    },
    {
        timestamps: true,
    }
)

const StateInfo = mongoose.model('StateInfo', stateInfoSchema);

module.exports = StateInfo;