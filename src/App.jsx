
import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import './App.css';
import InfoBox from "./component/InfoBox";
import Map from "./component/Map";
const App = () => {
  const [states, setStates] = useState([])
  const [state, setState] = useState('wholecountry')
  const [stateInfo, setStateInfo] = useState({})
  const [tableData, setTableData] = useState([])
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1b55a7014cmshc5082c1af2f975bp1548aejsn6f469f3dfc52',
      'X-RapidAPI-Host': 'election3.p.rapidapi.com'
    }
  };
  useEffect(() => {
    const url = 'https://election3.p.rapidapi.com/2019/presidential';
    
    const getData = async () => {
      await fetch(url, options)
        .then(res => res.json())
        .then(data => {
          const states = data.map((state) => ({
           stateName: state.state,
         //  value: state.stateInfo.iso
           value: state._id
          }))
          setTableData(data);
          setStates(states);
        })
       // .then(data => console.log(data))
        //.catch(err => console.error('error:' + err));
    }
    getData();
  }, [])
 // const fetch = require('node-fetch');

  const onStateChange = async (e) =>{
    const stateCode = e.target.value;
    console.log(stateCode);
    const url = stateCode === 'wholecountry'
    ? `https://election3.p.rapidapi.com/2019/presidential/62ecfd46f16fb887523187df`
    : `https://election3.p.rapidapi.com/2019/presidential/${stateCode}`
  await fetch(url, options)
  .then(res => res.json())
  .then(data => {
    setState(stateCode);
    setStateInfo(data);
    console.log(data)
  })
}
console.log(stateInfo)
  
  return (
    <div className="container">
      <div className="left">
        <div className="left__header">
          <h1>Nigerian Election</h1>
          <FormControl className="left__dropdown">
            <Select variant="outlined"onChange={onStateChange} value={state}>
              <MenuItem value='wholecountry'>Whole Country</MenuItem>
              {states.map((state) =>(
                <MenuItem value={state.value}>{state.stateName}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
        </div>
        <div className="left__stats">
          <InfoBox state={stateInfo.state} total= {stateInfo.stateInfo.totalvalidVotes} party={'APC'}votes={stateInfo.stateInfo.vote.APC} />
          <InfoBox state={stateInfo.state} total= {stateInfo.stateInfo.totalvalidVotes} party={'PDP'}votes={stateInfo.stateInfo.vote.PDP} />
          <InfoBox votes={400} total= {4000} party='PPA' />
        </div>
        <Map/>
      </div>
      <div className="right">
        <div className="right__table">
          {/*Table*/}
          Table
        </div>

        <div className="right__graph">
          graph
        {/*Graph*/}
        </div>
      </div>
    </div>
  )
};

export default App;