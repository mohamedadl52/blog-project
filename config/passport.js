// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');

// // Load User model
// const User = require('../models/User');


  // passport.use(
  //   'local-signup', new LocalStrategy({ usernameField: 'email' }, (req , email, password, done) => {
  //     // Match user
  //     User.findOne({
  //       email: email
  //     }).then(user => {
  //       if (!user) {
  //         return done(null, false, req.flash("emailmessage", 'That email is not registered' ));
  //       }
        // Match password
  //       bcrypt.compare(password, user.password, (err, isMatch) => {
  //         if (err) throw err;
  //         if (isMatch) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false, req.flash("errmessage", "Password incorrect"));
  //         }
  //       });
  //     });
  //   })
  // );

  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });




const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy
const User = require('../models/User')



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use('local-signup' , new LocalStrategy( { usernameField : 'email' , passwordField: "password" , passReqToCallback : true} , function(req ,username, password, done) {
if(req.body.password != req.body.repassword){
    return done( null , false , req.flash('error' , 'passwords not match') )
}else{
    User.findOne({email : username}, (err,user)=>{
        if(err){
           return done(err)

        }
        if(user){
            return done(null , false , req.flash('error','email used'))
            
        }

        if(!user){
            let newUser = new User()
            newUser.email = req.body.email
            newUser.username = req.body.username
            newUser.password = newUser.hashPassword(req.body.password)
            newUser.avatar = "profile.png"
            newUser.save((err, user)=>{
                if(!err){
                     return done(null,user,req.flash('scs' , "user added") )
                }else{
              console.log(err)
                }
            })
        }
    })
}

}
  ));




// login stratgy


passport.use('local-login' , new LocalStrategy( { usernameField : 'email' , passwordField: "password" , passReqToCallback : true} , function(req ,username, password, done) {

      User.findOne({email : username}, (err,user)=>{

if(err){
  return done(null , false , req.flash('error' , 'something wron happen'))
}
if(!user){
  
  return done(null , false , req.flash('error' , 'user not found please sign up '))
}
if(user){
  if(user.comparepassword(password , user.password)){

    return done(null , user , req.flash('scs' , 'wellcome again'))
  }else{

    return done(null , false , req.flash('error' , 'passsword incorrect'))
  }
}

      })  } ) )
  