const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/students');

mongoose.connect('mongodb://collegestudent:collegestudent123@ds145356.mlab.com:45356/collegestudent',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-control-Allow-Origin','*');
    res.header('Access-control-Allow-headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle request
app.use('/students',userRoutes);


app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 400;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;