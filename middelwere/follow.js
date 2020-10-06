const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } } ,(err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        console.log(req.body)
        next();
    });
};

exports.addFollowers = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } 
            
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

  exports.removellowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId,{$pull:{following:req.body.unfollowId}},(err,result) => {
        if (err){
          return res.json({error:err})
        }
        next()
    })

    
   
  
  }
  
  exports.removeFollowers = (req, res, next) => {
      User.findByIdAndUpdate(req.body.unfollowId,{$pull:{followers:req.body.userId}},{new:true})
     .populate('following','_id name')
     .populate('followers','_id name')
     .exec((err,result)=>{
       if(err){
           return  res.json({error:err})
       }
       result.hashed_password = undefined
       result.salt = undefined
       res.json(result)
     })
    
    }