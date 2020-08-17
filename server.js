const express = require('express')
const app = express()
const  bodyParser = require('body-parser')
const session = require('express-session') 
const path = require('path')
const flash = require('connect-flash')
//conected to db 
const db = require('./config/database')
const moment = require('moment'); 
moment().format(); 

// set the view engine to ejs
app.set('view engine', 'ejs');

// use file static with project
app.use(express.static(path.join(__dirname, 'public')))

// use body parser 
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

const passport = require('passport')

// user session and connect flash

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 15 }
  }))


  // passport setup
  require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

//user flash
  app.use(flash())


//
app.get("*" , (req,res,next)=>{
  res.locals.user = req.user || null
  next()
})
// redirect main page 
  app.get("/", (req, res) => {
    res.redirect("/event");
  });
// use router events
app.use('/event' , require('./routs/events'))


// use router user
app.use('/user' , require('./routs/user'))

// listen to port
app.listen(8080, (err)=>{
    if(!err){
        console.log('your are contected to port 8080 ')
    } else{
        console.log(err)
    }
})