require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/dbconnection');
const router = require('./Routes/v1');

const app = express();

app.use(bodyParser.json(), cors());
app.get('/',(req,res)=>{  
  res.send('welcome')
})
app.get('/hello',(req,res)=>{
  res.send('hello world')
})
// app.use(express.json());

app.use('/v1', router);

const port = 5000
app.listen(port, () => console.log(`Server listening on port: ${port}`));

connectDB();