const mongoose = require('mongoose')
const User = mongoose.model('User');


module.exports = (req,res,next,id) =>{
      User.findById(id)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec((err,user)=>{
          if(err || !user){
            return  res.json({error:'User not found'})
          }
          req.profile = user
          next()
      })
     
}

