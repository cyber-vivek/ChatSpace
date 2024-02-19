const User = require('../model/userModel');

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
        delete data.password;
        res.json({message: 'Account Created Successfullly', user: data,  status: true});
    }).catch(err => {
        res.status(200).json({message: err, status: false});
    })
}

const login = async (req, res, next) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    user = await userDoc.toJSON();
    if(!user) {
        res.json({message: 'Incorrect username of password!', status: false});
        return;
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if(!isPasswordSame) {
        res.json({message: 'Incorrect username of password!', status: false});
        return;
    }
    delete user.password;
    res.json({message: 'Logged in successfully', user, status: true});
}


module.exports = {
    register,
    login,
}