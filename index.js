const express = require('express');
const connectDatabase = require('./config/database')
const sourceData = require('./config/sourceData')
const dotenv = require('dotenv');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connecting to Database
connectDatabase();

//connecting to env file
dotenv.config();

//connecting to extracting delection data from different source
//sourceData();

 app.get('/', (req, res) => {
   res.send('Server is ready');
 });


 const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);
 });