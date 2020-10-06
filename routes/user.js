const mongoose = require('mongoose');
const User = mongoose.model('User');
const userId  = require('../middelwere/userId')
const {update,findpeople} = require('../middelwere/userpost')
const {auth} = require('../middelwere/auth')
const formidable = require('formidable');
const {addFollowing,addFollowers,removellowing,removeFollowers} = require('../middelwere/follow')
const {hasAuthorization} = require('../middelwere/hasAuthorize')

const fs = require('fs')

module.exports = app=>{

    app.put('/user/follow',auth,addFollowing,addFollowers)
    app.put('/user/unfollow',auth,removellowing,removeFollowers)

    app.get('/showalluser',(req,res)=>{
        User.find((err,users)=>{
            if(err){
                res.status(401).json({err})
            }
            res.json(users)
            
        }).select("name email update created role")
    })
    

    app.get('/user/:userId',auth,(req,res)=>{
        req.profile.hashed_password = undefined
        req.profile.salt = undefined

       return res.json(req.profile)
    })
    app.get('/user/findpeople/:userId',auth,findpeople)
  
    app.put('/user/:userId',auth, hasAuthorization,update)
    app.param('userId',userId)

    app.delete('/user/:userId',auth,hasAuthorization,(req, res) => {
        let user = req.profile
        user.remove((err, user) => {
            if (err){
                return res.json(err)
            }
            res.json({message:'your accaout deleted'})
        })
    })
   
   app.get('/user/photo/:userId', (req, res,next) => {
        if(req.profile.photo.data){
            res.set('Content-Type', req.profile.photo.contentType)
          return  res.send(req.profile.photo.data)
         
        }
        next()
   })

  
   
}   