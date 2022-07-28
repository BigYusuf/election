const express = require('express');
const connectDatabase = require('./config/database')
const sourceData = require('./config/sourceData')
const presiRouter = require('./routers/presiRouter');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const govRouter = require('./routers/governorRouter');
const presiCandidateRouter = require('./routers/presiCandidateRouter');
const presiStateRouter = require('./routers/presiStateRouter');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express()

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 only minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());



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