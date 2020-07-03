const mongoose = require('mongoose');
const User = require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signUp = async(req, res) => {
    try { 
        const user = await User.find({ email: req.body.email });
        console.log(user);
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail already exist!"
            });
        } else {
            //bcrypt..
            console.log("Hello1");
            bcrypt.hash((req.body.password).trim(), 10, async (err, hash) => {
                console.log("Hello2");
                if (!err) {
                    console.log("Hello3");
                        const student = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        console.log(student);
                    try {
                        const stud = await student.save();
                        return res.json({
                            message: "User saved.",
                            stud
                        });
                    } catch (err) {
                        return res.json({
                            error: err,
                            message: "User not Saved."
                        });
                    }
                } else {
                    return res.json({
                        error: err,
                        message:"Hashing Error!!!"
                    });
                }
            });
        }
    } catch (err) {
        return res.json({
            error: err,
            message: "Not find.."
        });
    }        
};

exports.user_logIn = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // res.status(200).json({
        //     user: user
        // });

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            console.log("Hello2 bcrypt");
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        _id: user._id,
                    },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            } else {
                console.log("Hello3 err");
                return res.status(401).json({
                    message: 'Auth failed..!'
                });
            }
        });
    } catch (err) {
        res.json({
            message: 'Not found!!!',
            error: err
        });
    }
};

exports.user_delete = async (req, res) => {
    try {
        const removedUser = await User.remove({
            _id: req.params.id
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

exports.user_update = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email } });  
    } catch (err) {
        res.json({
            message: err
        })
    }
}

exports.user_getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            users: users
        });
    } catch (err) {
        res.json({
            message: "Not avaiable.."
        });
    }
}

exports.getResponse = (req, res) => {
    res.status(200).json(
        {
            message: "Hello World!!!"
        }
    );  
};

