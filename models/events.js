const mongoose = require('mongoose')

const eventscema = new mongoose.Schema({

    title : {
        type : String ,
        required : true
    } ,
    description : {
        type : String ,
        required : true
    } ,
    date : {
        type : Date ,
        required : true
    } ,

    user_id : {
  type : String , 
  required : true
    } , 
    update_at : {
        type : Date 
    }
})

let Event = mongoose.model('events' , eventscema , 'events')
module.exports = Event