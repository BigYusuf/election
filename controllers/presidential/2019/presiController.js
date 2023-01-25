
const expressAsyncHandler = require('express-async-handler');
const Presidential = require('../../../models/presidential/presidentialModel');
//const electionData = require('../../../data/presidential/electionData2015');

exports.seedDataPresi = expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
   // await Presidential.remove({});

    //const createdPresi = await Presidential.insertMany(electionData.election2015);
    //res.send({ createdPresi});
    res.status(400).send({ message: 'Sorry Only Admin can Add many data' });

})

exports.getAllPresi = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    
    let party = req.query.party || "";
    let sort = req.query.sort || "state";

    let year = req.query.year || "All";
    let state = req.query.state|| "All";
    
    let yearOptions = ["2011", "2015", "2019", "2023"]
    let stateOptions = require(`./state.json`)

    year === "All" ? (year = [...yearOptions]) : (year = req.query.year.split(","));
    state === "All" ? (state = [...stateOptions]) : (state = req.query.state.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    

   if(req.query.party && req.query.state){
      
    const presi = await Presidential.find({ party: { $regex: party, $options: "i" } })
    .where("year").in([...year]).where("state").in([...state])
    .sort(sortBy).skip(page * limit).limit(limit);
    
    const total = await Presidential.countDocuments({
      year: { $in: [...year] },
      state: { $in: [...state] },
      party: { $regex: party, $options: "i" },
    });
      let datab =[]
      for (let i = 0; i < presi.length; i++) {
        datab.push({
          state: presi[i].state,
          year: presi[i].year,
          data: presi[i].stateInfo.vote.filter((a)=>a.party.toLowerCase()==party.toLowerCase()).map(x => x),
        })
      }
       
    const response = {message: 'Presidential Election By Party loaded successfully',
      total, page: page + 1, limit, years: yearOptions, election: datab
    };
    
    let data= response.election[0].data
     console.log("party only for a single state")
     if(data.length==0){
       res.status(404).json({message: `Party ${req.query.party} not found`});
     }else{
       res.status(200).json(response);
     }
     
    }else if(req.query.party){
      
    const presi = await Presidential.find({ party: { $regex: party, $options: "i" } })
    .where("year").in([...year]).where("state").in([...state])
    .sort(sortBy).skip(page * limit).limit(limit);

    const total = await Presidential.countDocuments({
      year: { $in: [...year] },
      state: { $in: [...state] },
      party: { $regex: party, $options: "i" },
    });
      let datab =[]
      for (let i = 0; i < presi.length; i++) {
        datab.push({
          state: presi[i].state,
          year: presi[i].year,
          data: presi[i].stateInfo.vote.filter((a)=>a.party.toLowerCase()==party.toLowerCase()).map(x => x),
        })
      }
       
    const response = {message: 'Presidential Election By Party loaded successfully',
      total, page: page + 1, limit, years: yearOptions, election: datab
    };
    
    let data= response.election[0].data
     console.log("party only")
     if(data.length==0){
       res.status(404).json({message: `Party ${req.query.party} not found`});
     }else{
       res.status(200).json(response);
     }
     
    }else if (req.query.state){
    const presi = await Presidential.find({ state: state})
    .where("year").in([...year]).sort(sortBy).skip(page * limit).limit(limit);
    const response = {message: 'Presidential Election loaded successfully',
      total: presi.length,
      election: presi};
      res.status(200).json(response);
     console.log("state")

    } else{

      console.log("general")     
      const presi = await Presidential.find({ party: { $regex: party, $options: "i" } })
      .where("year").in([...year])
      .where("state").in([...state])
        .sort(sortBy)
      .skip(page * limit).limit(limit);
      const total = await Presidential.countDocuments({
        year: { $in: [...year] },
        state: { $in: [...state] },
        party: { $regex: party, $options: "i" },
      });
    const response = {message: 'Presidential Election loaded successfully',
      total, page: page + 1, limit, years: yearOptions, election: presi};
    
    res.status(200).json(response);
    } 
})

exports.getPresi = expressAsyncHandler(async (req, res) => {
    const presi = await Presidential.findById(req.params.id);
    if (presi) {
      res.send(presi);
    } else {
      res.status(404).send({ message: 'State data Not Found' });
    }
})

exports.addNewPresi = expressAsyncHandler(async (req, res) => {
    const presi = new Presidential({
      state: req.body.state,
      type: req.body.type,
      year: req.body.year,
      stateInfo: req.body.stateInfo,
    });
    const createdPresi = await presi.save();
      res.status(200).send(
        {
            message: 'State data(president) Created', Presidential_Election: createdPresi 
        });
})

exports.updatePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential.findById(presidentId);
    
      if(president) {
        president.party = req.body.party;
        president.state = req.body.state;
        president.type = req.body.type;
        president.year = req.body.year;
        president.partyInfo = req.body.partyInfo;
        president.stateInfo = req.body.stateInfo;
        president.candidateInfo = req.body.candidateInfo;
        president.validVotes = req.body.validVotes;
        president.invalidVotes = req.body.invalidVotes;
        president.totalVotes = req.body.totalVotes;
        
        const updatedPresident = await president.save();
        res.send({ message: 'State data(president)  Updated', president: updatedPresident });
      }else{
        res.status(404).send({ message: 'State data Not Found' })
      }
})

exports.deletePresi = expressAsyncHandler(async (req, res) => {
    const presidentId = req.params.id;
    const president = await Presidential.findById(presidentId);
    if(president) {
        const deletePresident = await president.remove(); 
        res.send({ message: 'State data(president) Deleted', president: deletePresident });
    }else{
      res.status(404).send({ message: 'State data Not Found' })
    }
})