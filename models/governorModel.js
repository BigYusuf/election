const express = require('express')
const mongoose = require('mongoose')

const governorSchema = new mongoose.Schema(
    {
        party: {type: String, required: true, unique: true},
        state: {type: String, required: true, unique: true},
        year: {type: String, required: true},
        type: {type: String, required: true},        
        partyInfo: {
            name: { type: String},
            iso1: { type: String},
            logo: { type: String},
            chairman: { 
                name: String,
                image: String,
                age: Number,
            },
        },
        stateInfo: {
            name: { type: String},
            logo: { type: String},
            lga: { type: Number, default: 0},
            population: { type: Number, default: 0},
            iso1: { type: String},
            iso2: { type: String},
            lat: { type: Number, default: 0},
            long: { type: Number, default: 0},
            pvcholders: { type: Number, default: 0},
            party: { type: String},
            governor: { 
                name: String,
                image: String,
                age: Number,
            },
            depGovernor: { 
                name: String,
                image: String,
                age: Number,
            },
        },
        candidateInfo: {
            candidate: { 
                name: String,
                image: String,
                sex: String,
                age: Number,
                post: String,
            },
            runningMate: { 
                name: String,
                image: String,
                sex: String,
                age: Number,
                post: String,
            },
        },
        validVotes: { type: Number, default: 0},
        invalidVotes: { type: Number, default: 0},
        totalVotes: { type: Number, default: 0},
    },
    {
        timestamps: true,
    }
)

const Governor = mongoose.model('Governor', governorSchema);

module.exports = Governor;