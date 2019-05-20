const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/students');

router.get('/',StudentsController.students_get_all);

router.post('/',StudentsController.create_student);

router.get('/:studentId',StudentsController.get_student);

router.patch('/:studentId',StudentsController.update_student);

router.delete('/:studentId',StudentsController.delete_student);

module.exports = router;