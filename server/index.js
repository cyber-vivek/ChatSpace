const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

let server;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db successfully')
    server = app.listen(process.env.PORT, () => {
        console.log('Server Started Successfully');
    })
}).catch( (err) => {
    console.log('could not connect to db')
})



app.use('/api/auth',userRoutes)