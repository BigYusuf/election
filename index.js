const express = require('express');
const connectDatabase = require('./config/database')
const sourceData = require('./config/sourceData')
const dotenv = require('dotenv');
const {govRouter, presiRouter, presiStateRouter, presiCandidateRouter, userRouter, presi2015Router} = require('./routers/index');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
//const rateLimiter = require('express-rate-limit');

const app = express()

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());
/*app.use(rateLimiter({
  windowMs: 60 * 1000, 
  max: 60, // limit each IP to 60 requests per windowMs
}));
*/

//connecting to Database
connectDatabase();

//connecting to env file
dotenv.config();

//connecting to extracting delection data from different source
//sourceData();

//presidential election 
 app.use('/api/2019/presidential', presiRouter);
 app.use('/api/2015/presidential', presi2015Router);
// app.use('/api/presidential', presiRouter);
 app.use('/api/users', userRouter);
 app.use('/api/2019/presidential/candidates', presiCandidateRouter);
 app.use('/api/2015/presidential/candidates', presiCandidateRouter);
 app.use('/api/2019/presidential/stateinfo', presiStateRouter);
 //app.use('/api/governors', govRouter);
 app.get('/', (req, res) => {
   res.send('Nigeria Election API');
   //res.send(sourceData());
 });
 app.get('/news', async (req, res) => {
  const {url, contentName} = req.query;
  const news = await sourceData(url, contentName);
   res.send(news);
 });


 const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);
 });