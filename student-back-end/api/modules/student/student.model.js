const mongoose = require('mongoose');
const userSchema = require('../user/user.model');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    email: { type: String, required: true },
    //userID:{ type: mongoose.Schema.Types.ObjectId, ref:userSchema._id}
});

module.exports = mongoose.model('student', studentSchema);