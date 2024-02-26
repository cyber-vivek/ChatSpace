const Message = require('../model/messageModel');

const addMessage = async (req, res, next) => {
    const {from, to, message} = req.body;
    const newMessage = new Message({
        message,
        users: [from, to],
        sender: from,
    })
    newMessage.save().then(data => {
        return res.json({status: true, message: 'message saved successfull'});
    }).catch(err => {
        return res.json({status: false, message: 'Error saving message', err});
    })
}

const getAllMessages = async (req, res, next) => {
    const {from, to} = req.body;
    let messages = await Message.find({users: {$all: [from, to]}}).sort({updatedAt: 1});
    messages = messages || [];
    const msgData = messages.map(msg => {
        return {
            message: msg.message,
            fromSelf: msg.sender.toString() === from,
        }
    })
    return res.json({status: true, messages: msgData});  
}

module.exports = {
    addMessage,
    getAllMessages
}