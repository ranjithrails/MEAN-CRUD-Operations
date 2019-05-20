const mongoose = require('mongoose');
const Student = require('../models/students');

exports.students_get_all = (req,res,next) => {
    Student.find().exec().then(docs => {
        res.status(200).json({
            count : docs.length,
            students : docs.map(doc => {
                return {
                    _id : doc._id,
                    fname : doc.fname,
                    lname : doc.lname,
                    dob : doc.dob,
                    dept : doc.dept,
                    country : doc.country
                }
            }),
        });
    }).catch(err =>{
        res.status(500).json({
            error: err
        });
    });
    
}

exports.create_student = (req,res,next) => {
  const student = new Student({
      _id : new mongoose.Types.ObjectId(),
      fname : req.body.fname,
      lname : req.body.lname,
      dob : req.body.dob,
      dept : req.body.dept,
      country : req.body.country
  });
  student.save().then(result => {
      res.status(201).json({
          message: 'Created student successfully',
          createdStudent: {
            _id : result._id,
            fname : result.fname,
            lname : result.lname,
            dob : result.dob,
            dept : result.dept,
            country : result.country,
          }
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
}

exports.get_student = (req,res,next) => {
    Student.findById(req.params.studentId).exec().then(student => {
        if(!student)
        {
            res.status(404).json({
                message : 'student not found'
            });
        }
        res.status(200).json({
          _id : student._id,
          fname : student.fname,
          lname : student.lname,
          dob : student.dob,
          dept : student.dept,
          country : student.country
        });
    }).catch(err => {
       res.status(500).json({
           error : error
       });
    });
 }

 exports.update_student = (req,res,next) => {
  const id = req.params.studentId;
  const inputData = req.body;
  const updateOps = {};
 
  for (const ops of Object.keys(inputData)){
      updateOps[ops] = inputData[ops];
  }
  Student.update({_id : id},{ $set : updateOps}).exec().then(result => {
      res.status(200).json({
          message : "Student Updated"
      });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
          error : err
      });
  });

}

 exports.delete_student = (req,res,next) => {
    const id = req.params.studentId;
    Student.deleteOne({_id : id}).exec().then(result => {
        res.status(200).json({
            message : 'Student deleted'
        });
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        });
    })
}