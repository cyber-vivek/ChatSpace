const User = require('../model/userModel');

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck) {
        return res.json({message: 'Username already used', status: false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck) {
        return res.json({message: "email already used", status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({username, email, password: hashedPassword});
    user.save().then(msg => {
        res.json({message: 'Account Created Successfullly', status: true});
    }).catch(err => {
        res.status(200).json({message: err, status: false});
    })
}


module.exports = {
    register,
}