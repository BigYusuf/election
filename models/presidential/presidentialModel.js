const mongoose = require('mongoose')

const presidentialSchema = new mongoose.Schema(
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
            population: { type: Number, default: 0},
            lat: { type: Number, default: 0},
            long: { type: Number, default: 0},
            registeredVoters: { type: Number, default: 0},
            accreditedVoters: { type: Number, default: 0},
            vote: {type: Object, required: true},
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

const Presidential = mongoose.model('Presidential', presidentialSchema);

module.exports = Presidential;