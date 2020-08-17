const mongoose = require('mongoose')
const bycrypt =  require('bcryptjs')
const userscema = new mongoose.Schema({

    email : {
        type : String ,
        required : true
    } ,
    password : {
        type : String ,
        required : true
    } ,
    username : {
        type : String ,
        required : true
    } , 
    avatar : {
        type : String ,
        required : true
    }
})

userscema.methods.hashPassword = (password)=>{
    return bycrypt.hashSync(password , bycrypt. genSaltSync(10))

}
userscema.methods.comparepassword = (password , hash)=>{
    return bycrypt.compareSync(password, hash)

}

let User = mongoose.model('users' , userscema , 'users')
module.exports = User