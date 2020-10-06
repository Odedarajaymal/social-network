const mongoose = require('mongoose');
const {auth} = require('../middelwere/auth')
const userId  = require('../middelwere/userId')
const postId  = require('../middelwere/postbyId')
const ispost = require('../middelwere/ispost')
const _ = require('lodash')
const formidable = require('formidable');
const {createPost,postById,isLikePost,isunLikePost,comment,uncomment} = require('../middelwere/userpost')
const fs = require('fs');
const Post = mongoose.model('post');


module.exports = app => {

    app.put('/post/like',auth, isLikePost)
    app.put('/post/unlike',auth, isunLikePost)
    app.put('/post/comment', auth, comment);
    app.put('/post/uncomment', auth, uncomment);
    app.post('/post/new/:userId',auth,createPost)
   
    app.param('userId',userId)
    app.param('postId',postById)


    
    app.get('/post/photo/:postId',(req, res, next)=>{
         res.set('Content-Type', req.post.photo.contentType);
         return res.send(req.post.photo.data);

    })
    app.get('/post/:postId',(req,res)=>{
         return res.json(req.post)
    })
    app.get('/showallposts',(req, res) =>{
        const posts = Post.find()
        .populate("postedBy", "_id name")
        .select("_id title body created likes")
        .populate("comments", "text created")
        .populate("comments.postedBy", "_id name role")
        .sort({ created: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));
    })
   app.get('/post/by/:userId',(req,res)=>{
       Post.find({postedBy:req.profile._id})
       .populate('postedBy','_id name likes')
       .populate("comments", "text created")
       .populate("comments.postedBy", "_id name")
       .select("_id title body created likes")
       .sort('_created')
       .exec((err,posts)=>{
           if(err){
               return res.json(err)
           }
           res.json(posts)
       })
     
   }) 

   app.delete('/post/:postId',auth,ispost,(req, res)=>{
        const post = req.post
        post.remove((err,post)=>{
            if(err){
                return res.json({err:'post not deleted'})
            }
            res.json({post:'post deleted'})
        })
   })
 
 

   app.put('/post/:postId',auth,ispost, async(req, res)=>{
          let form = new formidable.IncomingForm()

           form.keepExtensions = true
         form.parse(req,(err, fields, files)=>{

              if(err){
                  return res.json({err:'photo not upload'})
              }
             let post = req.post
                post = _.extend(post,fields)
                   post.created = Date.now()  

                if(files.photo){
                     post.photo.data  = fs.readFileSync(files.photo.path)
                     post.photo.contentType = files.photo.type
                }
                  post.save((err,result)=>{
                      if(err){
                          return res.json(err)
                      }
                      res.json(result)
                  })
            

         })       
   })


}