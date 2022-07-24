const mongoose = require('mongoose')

const partyInfoSchema = new mongoose.Schema(
    {    
        name: { type: String},
        iso: { type: String},
        logo: { type: String},
        founded: { type: String},     
    },
    {
        timestamps: true,
    }
)

const PartyInfo = mongoose.model('PartyInfo', partyInfoSchema);

module.exports = PartyInfo;