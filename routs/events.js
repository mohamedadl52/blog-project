var express = require('express')
var router = express.Router()
var Event = require('../models/events')
const { body, validationResult } = require('express-validator');
const moment = require('moment'); 
moment().format();


isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/user/login')
  }
  

router.get('/create' ,isAuthenticated,  (req,res)=>{
    res.render('events/create' , {
title : "add event" , errors : req.flash('errors')
    })
})



router.post('/create' ,  [
    body('title').isLength({ min: 5 }).withMessage('title must be at least 5 chars long'),
    body('description').isLength({ min: 5 }).withMessage('description must be at least 5 chars long') ,
    body('date')
  ],isAuthenticated, (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors' , errors.array())
        res.redirect('create')
    } else{
        let newEvent = new Event({
            title : req.body.title ,
            description : req.body.description ,
            date : req.body.date ,
            user_id : req.user.id , 
            update_at : Date.now().toString()
            
        })
        newEvent.save((err)=>{
            if(!err){
                req.flash('mss' , 'succsfully add event')
                res.redirect('/event')
            } else {
                console.log(err)
            }
        })
    }

 
})
router.get('/:pageNo?', isAuthenticated, (req,res)=>{

    let pageNo = 1

    if ( req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }

    if(req.params.pageNo==0){
        pageNo = 1
    }

    let q = {
        skip: 5 * (pageNo - 1),
        limit : 5
    }

    let totalDocs = 0 
    Event.countDocuments({},(err , total)=>{

    } ).then((response)=>{
        totalDocs = parseInt(response)
        Event.find({},{},q,(err , events)=>{
            let chunk = [] 
            let chuksize = 3 
            for(let i = 0 ; i < events.length ; i+=chuksize ){
            chunk.push(events.slice(i , chuksize + i))
            }
        
            res.render('./events/index', {title: "home" , chunk : chunk , mss : req.flash('mss') ,total: parseInt(totalDocs),
            pageNo: pageNo
})
        
           })
    })
 
})

router.get('/show/:id' ,isAuthenticated , (req,res )=>{
    
    Event.findOne({_id : req.params.id}, (err, event)=>{
     if(!err){
        res.render('./events/show' , { title : "event title" , event : event 
    }) }else {

    console.log(err)
     }
    })
 
})

router.get('/edit/:id' ,isAuthenticated, (req,res)=>{
  
    Event.findOne({_id : req.params.id}, (err, event)=>{
     if(!err){
        res.render('./events/edit' , { title : "event title" , event : event  , Eventdate : moment(event.date).format('YYYY-MM-DD') , errors : req.flash('errors') ,  mss : req.flash('mss')
    }) }else {

    console.log(err)
     }
    })
    }
)

router.post('/update' , [
    body('title').isLength({ min: 5 }).withMessage('title must be at least 5 chars long'),
    body('description').isLength({ min: 5 }).withMessage('description must be at least 5 chars long') ,
    body('date')
  ] ,isAuthenticated, (req, res )=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors' , errors.array())
        res.redirect('/event/edit/' + req.body.id)
     
    } else{
       let newfiled = {
           title : req.body.title ,
           description : req.body.description,
           date : req.body.date
       }    
       let query = {_id : req.body.id}
       Event.updateOne(query,newfiled , (err)=>{
           if(!err){
               req.flash('mss' , 'data updated')
               res.redirect('event/../edit/' + req.body.id)
           }else{
               console.log(err)
           }
       })
    }
})


router.delete('/delete/:id', isAuthenticated  , (req,res)=>{
    let query = {_id : req.params.id} 
    Event.deleteOne(query , (err)=>{
        if(!err){
           res.status(200).json('success deleted')
        }else{
            res.status(404).json('sorry there was error')
        }
    })
})
module.exports = router