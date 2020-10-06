const mongoose = require('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto');
const { ObjectId,Schema } = mongoose;


const useSchema = new Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },email:{
       type: String,
       trim: true,
       require: true  
    },hashed_password:{
        type: String,
        require: true
    },
    salt:String,
    created:{
        type: Date,
        default:Date.now
    },
    updated:Date,
    photo:{
        data:Buffer,
        contentType:String
    },
    about:{
        type: String,
        trim: true,
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }


}) 

useSchema.virtual('password')
.set(function (password){
    this._password = password
     this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
   return this._password
})

useSchema.methods ={
    
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if(!password) return ''
        try{
         return  crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }catch(e){
            return ''
        }
       
    }
}


module.exports= mongoose.model('User',useSchema)