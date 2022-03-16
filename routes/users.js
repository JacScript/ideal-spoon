const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mid = require('../middleware');


//Login
router.get('/login',mid.loggedOut,(req, res )=>{
    res.render('login');
});

//Post /login
router.post('/login',(req, res, next)=>{
    if(req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user){
          if(error || !user){
              var err = new Error('Wrong email or password.');
              err.status = 401;
              return next(err);
          }
          else {
              req.session.userId = user._id;
              return res.render('dashboard');
          }
      });
    } else {
        var err = new Error ('Email and password are required');
            err.status = 401;
            return next(err);
    }
});


//Register
router.get('/register',mid.loggedOut,(req, res )=>{
    res.render('register');
});

//Post Handler
router.post('/register', (req, res, next)=>{
    if( req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmpassword ) {
            

            //Confirm that User typed same password twice
          if(req.body.password !== req.body.confirmpassword) {
            var err = new Error ('Password do not match.');
            err.status = 400;
            return next(err);
          }
               
          //Check the length of the password
          if(req.body.password <6) {
            var err = new Error ('Password should be atleast 6 .');
            err.status = 400;
            return next(err);
          }
             
          //create object with form input
          var userData = {
              email: req.body.email,
              name: req.body.name,
              password: req.body.password
          }

         //use schema's create method to insert document into Mongo
         User.create(userData, (error, user)=> {
             if(error){
                 return next(error);
             }else {
                 req.session.userId = user._id;
                 return res.render('dashboard')
             }
         })

        } else {
            var err = new Error ('All field are required.');
            err.status = 400;
            return next(err);
        }
});

module.exports = router;