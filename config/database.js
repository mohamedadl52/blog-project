const mongoose = require("mongoose");
var uri = "mongodb://localhost:27017/eventdb";
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true} , (error)=> {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to database");
  }
});
