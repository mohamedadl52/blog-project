const db = require('../config/database')
const Event = require('../models/events')

let newEvents = [
    new Event({
        title: "title 1 " ,
        description : "description 1" ,
        date : Date.now() ,
        update_at : Date.now()

    }) ,
    
    new Event({
        title: "title 2 " ,
        description : "description 2" ,
        date : Date.now() ,
        update_at : Date.now()

    }),
    
    new Event({
        title: "title 3 " ,
        description : "description 3" ,
        date : Date.now() ,
        update_at : Date.now()

    }) ,
    
    new Event({
        title: "title 4 " ,
        description : "description 4" ,
        date : Date.now() ,
        update_at : Date.now()

    }),

]

newEvents.forEach((event)=>{
    event.save((err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('items inserted')
        }
    })
})


// const even1 = new Event({
//     title : "first title " ,
//     description : "first description" ,
//     date : Date.now()
// }) 

// even1.save((err)=>{
//     if(err){
//         console.log(err) 
//     }else{
//         "sucssefull add"
//     }
// })