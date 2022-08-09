const mongoose = require('mongoose')

const presidential2015Schema = new mongoose.Schema(
    {
        state: {type: String, required: true},
        year: {type: String},
        type: {type: String},
        stateInfo: {
            name: { type: String},
            capital: { type: String},
            logo: { type: String},
            iso: { type: String},
            lga: { type: Number, default: 0},
            geo: {
                lat: { type: Number, default: 0},
                long: { type: Number, default: 0}
            },
            registeredVoters: { type: Number, default: 0},
            accreditedVoters: { type: Number, default: 0},
            vote: {type: Array, required: true},
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
        
    },
    {
        timestamps: true,
    }
)

const Presidential2015 = mongoose.model('Presidential2015', presidential2015Schema);

module.exports = Presidential2015;