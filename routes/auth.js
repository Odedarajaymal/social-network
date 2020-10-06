const mongoose = require('mongoose');
const User = mongoose.model('User');
const validator = require('../validator/index')
const {passwordResetValidator} = require('../validator/newpss')
const jwt = require('jsonwebtoken')
const {forgotPassword,resetPassword,socialLogin} = require('../middelwere/forgetpass')
require('dotenv').config()

module.exports = app=>{
    app.post("/social-login", socialLogin); 

    app.post('/signup',validator,async(req,res)=>{
    try{
        const userexit = await User.findOne({email:req.body.email})
        if(userexit) return res.json({error:'email is already registered'})
        const user = await new User(req.body)
        await user.save()
        res.json({message:'signup is completed please login'})
  
    }catch(err) {
        res.status(400).send('something went wrong') 
    } 
   })

app.post('/signin', (req, res) => {  
    const {email,password} = req.body      
    User.findOne({email}, (err, user) => { 
        if(err || !user){
            res.status(401).json({error:'user not found'})
        }

        if(!user.authenticate(password)){
            res.status(401).json({error:'user not found'})
        }
        const token = jwt.sign({ _id: user._id, role: user.role },process.env.JWT_SECRET)
        res.cookie('t',token,{expiresIn:Date.now()+9999})
        const {_id,name,email,role} = user
      return res.json({token,user:{_id,name,email,role}})
    }) 


})
app.get('/signout',(req, res)=>{
    res.clearCookie('t')
    res.json({message:'signout successful'})
})

// password forgot and reset routes
app.put("/forgot-password", forgotPassword);
app.put("/reset-password", passwordResetValidator, resetPassword);


}