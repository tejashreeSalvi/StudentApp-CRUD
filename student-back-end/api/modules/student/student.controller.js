const mongoose = require('mongoose');
const Student = require('./student.model');

exports.add_student = async(req, res) => {
    try {
        const studentObj = new Student({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        const newStudent = await studentObj.save();
        if (newStudent) {
            res.status(200).json({
                message: "Student Added..!!",
                newStudent
            });
        } else (err) => {
            res.status(500).json({
                message: "Student not Added..!!",
                error: err
            });
        }    
    } catch (err) {
        res.json({
            error: err
        });
    }
};

exports.get_students = async(req, res) => {
    try {
        const students = await Student.find();
        if (students.length > 0) {
            res.status(200).json({
                message: students
            });
        }
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
};

exports.delete_student = async (req, res) => {
    try {
        const removedStudent = await Student.remove({
            _id: req.params.id
        });  
        res.json(removedStudent);
    } catch (err) {
        res.json({
            error: err,
            message: 'Not Deleted'
        })
    }
};

exports.get_student_Id = async (req, res) => {

        const student1 = await Student.findById(req.params.id);

        res.status(200).json({
            message: student1
        });

};


exports.update_Student = async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate({_id: req.params.id }, { $set: req.body });
    res.json(updatedStudent);
};