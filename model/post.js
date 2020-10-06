const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    photo:{
        data:Buffer,
        contentType: String
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    created:{
        type:Date,
        default:Date.now()
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]

    
})


module.exports= mongoose.model('post',postSchema)