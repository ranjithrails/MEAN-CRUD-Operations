const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:{
        type : String,
        required : true
    },
    lname:{
      type : String,
      required : true
    },
    dob:{
      type : String,
      required : true
    },
    dept:{
      type : String,
    },
    country: {
        type: String
    }
});


module.exports = mongoose.model('Student',studentSchema);