const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const mid = require('../middleware');

//Home
router.get('/',(req, res )=>{
    res.render('home');
});

//Contact-us
router.get('/contact-us',(req, res )=>{
    res.render('contact');
});


//About-us
router.get('/about-us',(req, res )=>{
    res.render('about');
});

//Services
router.get('/service',(req, res )=>{
    res.render('service');
});

router.get('/dashboard',mid.requiresLogin, (req, res)=>{
    User.findById(req.session.userId)
        .exec(function (error, user){
        if(error) {
            return(error);
        } else {
            res.render('dashboard',{title: 'Welcome'});
        }
        });
});
//
router.get('/logout', function(req, res, next){
    if(req.session) {
        // delete session object
        req.session.destroy((err)=>{
        if(err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
        });
    };
});




module.exports = router;