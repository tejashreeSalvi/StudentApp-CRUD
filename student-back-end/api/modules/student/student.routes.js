const express = require('express');
const router = express.Router();
const studentController = require('./student.controller');

router.get('/getStudent', studentController.get_students);

router.post('/addStudent', studentController.add_student);

router.get('/getId/:id', studentController.get_student_Id);

router.delete('/deleteStudent/:id', studentController.delete_student);

router.patch('/updateStudent/:id', studentController.update_Student);


module.exports = router;