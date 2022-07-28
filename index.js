const express = require('express');
const connectDatabase = require('./config/database')
const sourceData = require('./config/sourceData')
const presiRouter = require('./routers/presiRouter');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const govRouter = require('./routers/governorRouter');
const presiCandidateRouter = require('./routers/presiCandidateRouter');
const presiStateRouter = require('./routers/presiStateRouter');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connecting to Database
connectDatabase();

//connecting to env file
dotenv.config();

//connecting to extracting delection data from different source
//sourceData();

//presidential election 
 app.use('/api/presidential', presiRouter);
 app.use('/api/users', userRouter);
 app.use('/api/2019/presidential/candidates', presiCandidateRouter);
 app.use('/api/2019/presidential/stateinfo', presiStateRouter);
 //app.use('/api/governors', govRouter);
 app.get('/', (req, res) => {
   res.send(sourceData());
 });


 const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);
 });