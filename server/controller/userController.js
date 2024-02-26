const User = require('../model/userModel');
const {createSecretToken} = require('../utils/SecretToken');

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck) {
        res.json({message: 'Username already used', status: false});
        return
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck) {
        res.json({message: "email already used", status: false});
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({username, email, password: hashedPassword});

    user.save().then(data => {
        const token = createSecretToken(data._id);
        res.json({message: 'Account Created Successfullly', token,  status: true});
    }).catch(err => {
        res.status(200).json({message: err, status: false});
    })
}

const login = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) {
        res.json({message: 'Incorrect username of password!', status: false});
        return;
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if(!isPasswordSame) {
        res.json({message: 'Incorrect username of password!', status: false});
        return;
    }
    const token = createSecretToken(user._id);
    res.json({message: 'Logged in successfully', token, status: true});
}

const setAvatar = async (req, res, next) => {
    const {image} = req.body;

    const userDoc = await User.findOne({_id: req.user.id});
    if(!userDoc){
        res.json({message: 'cannot find user', status: false});
        return;
    }
    User.updateOne({_id: req.user.id}, {$set: {avatarImage: image, isAvatarImageSet: true}}).then(data => {
        return res.json({status: true, message: 'Successfully updated avatar'});
    }).catch(err => {
        return res.json({status: false, message: 'error updating'});
    })
}

const getAllusers = async (req, res, next) => {
    const users = await User.find({_id: {$ne: req.user.id}}, {username: 1, avatarImage: 1});
    if(!users) {
        return res.json({status: false, users: [], message: 'Could not found users'});
    }
    return res.json({status: true, users, message: 'Successfully fetched all users'});
}

const getUserDetails = async (req, res, next) => {
    const user = await User.findOne({_id: req.user.id});
    if(!user) {
        return res.status(401).json({status: false, message: 'Unaurhorised access'});
    }
    return res.json({status: true, userDetails: user});
}


module.exports = {
    register,
    login,
    setAvatar,
    getAllusers,
    getUserDetails
}