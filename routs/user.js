var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const multer = require('multer')



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png') 
  }
})


var upload = multer({ storage: storage })


isAuthenticated = (req,res,next)=>{
  if(req.isAuthenticated()) return next()
  res.redirect('/user/login')
}


router.get("/", (req, res) => {
  res.redirect("/event");
});

router.get("/rejster", (req, res) => {
  res.render("user/rejster", { title: "rejster page" , errors : req.flash('errors') , mss : req.flash('mss') , error :  req.flash('error')  } );
});


router.get("/login", (req, res) => {
  res.render("user/login", { title: "login page" , errors : req.flash('errors') ,error: req.flash('error'), mss : req.flash('mss') , scs : req.flash('scs') } );
});


router.get("/dashboard", isAuthenticated, (req, res) => {
  
  res.render("user/dashboard", { title: "login page" , errors : req.flash('errors') ,error: req.flash('error'), mss : req.flash('mss') , scs : req.flash('scs') } );
});




router.post('/rejster',
  passport.authenticate('local-signup', { successRedirect: '/user/login',
                                   failureRedirect: '/user/rejster',
                                   failureFlash: true })
);
router.post('/login',
  passport.authenticate('local-login', { successRedirect: '/user/dashboard',
                                   failureRedirect: '/user/login',
                                   failureFlash: true })
);


router.post('/uploadimg', upload.single('avatar'), function (req, res) {
  let newfiled = {
    avatar : req.file.filename
  }
  User.updateOne({_id : req.user._id} , newfiled ,(err)=>{
if(!err){
res.redirect('/user/dashboard')
}else{
console.log(err);
  
}
  })
  })

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/user/login');
});

// router.post(
//   "/rejster",
//   [
//     body("username")
//       .isLength({ min: 5 })
//       .withMessage("username must be at least 5 chars long"),
//     body("password")
//       .isLength({ min: 5 })
//       .withMessage("pawword must be at least 5 chars long"),
//     body("email").isEmail().withMessage('email must be email'),
//   ],
//   (req, res) => {
    
//     const errors = validationResult(req);


//     if (!errors.isEmpty()) {
//       req.flash("errors", errors.array());
//       res.redirect("/user/rejster");
//     } else {

//       let email = req.body.email
//       User.findOne({ email : email }).then((user) => {
//         if (user) {
//           req.flash("error", "your email is used");
//           res.redirect("/user/rejster");
//         } else {
//           let newUser = new User({
              
//             username : req.body.username ,
//             email : req.body.email ,
//             password : req.body.password 
            
//           });
//           bcrypt.genSalt(10,(err , salt)=>{
//               bcrypt.hash(newUser.password , salt, (err, hash)=>{
//             if(err) throw err
//             newUser.password = hash
//             newUser.save((err)=>{
//               if(!err){
//                   req.flash('mss' , 'succsfully add user')
//                   res.redirect('/user/login')
//               } else {
//                   console.log(err)
//               }
//           })
//               })
//           })
//         }
//       });
//     }
//   }
// );

module.exports = router;
