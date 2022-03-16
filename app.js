'use strict';

//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const port = process.env.PORT || 8080 ;


// // make user ID available in template
// app.use((req, res, next)=>{
//     res.locals.currentUser = req.session.userId;
//     next();
// })

//static files
app.use(express.static('public'))
app.use('/css' ,express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))

//pug engine
app.set('view engine','pug');
app.set('views',__dirname + '/views');

//Bodyparser
app.use(bodyparser.urlencoded({ extended: true}));

//DB Config
const db = "mongodb://localhost:27017/userDB";

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
   .then(()=> console.log('MongoDB Connected.....'))
   .catch(err => console.log(err));

   // Use session for tracking
app.use(session({
    secret:'This is so nice to grind and have hopes',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: db
    })
}));

//Routes
app.use('', require('./routes/index'));
app.use('/users', require('./routes/users'));


// ERROR HANDLER
// define as the last app.use callback before listen
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    })
  // Log errors to server as well
    console.log(`${err.status} - ${err.message}`)
  });

  
//Listen on port 8080
app.listen(port, ()=> console.info(`Listen on port ${port}`))
