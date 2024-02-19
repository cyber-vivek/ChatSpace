const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('db connection successfull')
}).catch( (err) => {
    console.log('could not connect to db')
})

const server = app.listen(process.env.PORT, () => {
    console.log('Server Started Successfully');
})

app.use('/api/auth',userRoutes)