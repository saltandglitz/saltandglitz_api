require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/dbconnection');
const router = require('./Routes/v1');
// const authRoutes = require('./Routes/v1/Auth')
// const otpRoutes = require('./Controller/otpController');
const userRoutes = require('./Routes/v1/userRoutes');
const app = express();

app.use(cors()); // CORS should be applied before routes
app.use(bodyParser.json()); // Body parser should come after CORS

app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/hello', (req, res) => {
  res.send('hello world')
})

app.use('/v1', router);
app.use('/api/users', userRoutes);

const port = 5000
app.listen(port, () => console.log(`Server listening on port: ${port}`));

connectDB();