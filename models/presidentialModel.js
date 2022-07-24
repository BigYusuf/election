const mongoose = require('mongoose')

const presidentialSchema = new mongoose.Schema(
    {
        party: {type: String, required: true},
        state: {type: String, required: true},
        year: {type: String, required: true},
        type: {type: String, required: true},
        vote: {type: Number, required: true},
        partyInfo: {
            name: { type: String},
            iso: { type: String},
            logo: { type: String},
            founded: { type: String},
        },
        stateInfo: {
            name: { type: String},
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
        candidateInfo: {
            party: String,
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
    },
    {
        timestamps: true,
    }
)

const Presidential = mongoose.model('Presidential', presidentialSchema);

module.exports = Presidential;