const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authenticateUser = require('./middlewares/authMiddlware');
const {Server} = require('socket.io');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

let server;
let io;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db successfully')
    server = app.listen(process.env.PORT, () => {
        console.log('Server Started Successfully');
        setupSocket();
    })
}).catch( (err) => {
    console.log('could not connect to db')
})



app.use('/api/auth',userRoutes);
app.use('/api/chat', authenticateUser, messageRoutes);


const setupSocket = () => {
    global.onlineUsers = new Map();
    io = new Server(server, {
        cors: {
            origin: 'https://chat-space-connect.vercel.app',
            methods: ["GET", "POST"],
        }
    });

    io.on('connection', (socket) => {
        socket.on('add-user', (userId) => {
            onlineUsers.set(userId, socket.id)
        });

        socket.on('message-send', (data)=> {
            const sendUserSocket = onlineUsers.get(data.to);
            if(sendUserSocket) {
                io.to(sendUserSocket).emit('message-recieve', {message: data.message, from: data.from});
            }
        })
    });
}