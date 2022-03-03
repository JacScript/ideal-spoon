'use strict';

//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const session = require("express-session");
const encrypt = require("mongoose-encryption");
const port = 8080 ;


//DB Config
const db = "mongodb://localhost:27017/userDB";

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
   .then(()=> console.log('MongoDB Connected.....'))
   .catch(err => console.log(err));

//    const userSchema = {
//        name: String,
//        email: String,
//        password: String,
//        confrimPassword:String
//    } 


const userSchema = new mongoose.Schema ({
    name: {
        type:String,
        required:true
          },
    email: {
        type: String,
        unique:true,
        trim:true,
        required:true
          },
    password: {
        type:String,
        required:true
         },
    date: {
        type: Date,
        default: Date.now
         }
});

const secret = "Workhardtilltheendbetterdaysrcoming"; 
userSchema.plugin(encrypt, { secret: secret,  encryptedFields: ['password'] });


const User = new mongoose.model("User", userSchema);


//Bodyparser
app.use(express.urlencoded({ extended: true}));



app.use(session({
    secret:'first webAPP',
    resave: true,
    saveUninitialized:true
}));



//static files
app.use(express.static('public'))
app.use('/css' ,express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))



//pug engine
app.set('view engine','pug');
app.set('views',__dirname + '/views')
app.get('/',(req,res)=>{
    res.render('home')
});


app.get("/Login",(req, res)=>{
    res.render("login");
});

app.get("/About-us",(req, res)=>{
    res.render("about");
});

app.get("/Contact-us",(req,res)=>{
    res.render("contact");
});

app.get("/Services",(req,res)=>{
    res.render("service");
});

app.get("/register",(req, res)=>{
    res.render("register");
});

app.post("/register",(req, res)=>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password 
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        } else {
            res.render("dashboard");
        }
    }); 
});

app.post('/login',(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email}, (err, foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if(foundUser) {
                if(foundUser.password === password) {
                    res.render('dashboard');
                }
            }
        }
    });
});

//Listen on port 8080
app.listen(port, ()=> console.info(`Listen on port ${port}`))
