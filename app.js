const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
var cors = require('cors')

require('./model/user')
require('./model/post')
require('dotenv').config()
const port = process.env.PORT || 5050


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json('invalid token...');
    }
  });

  mongoose.Promise = global.Promise //To use the native js promises
mongoose.connect(process.env.mongo_Url,{ useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log('connection success')
    } else {
        console.log('some err')
    }
})



require('./routes/auth')(app)
require('./routes/post')(app)
require('./routes/user')(app)
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


app.listen(port,()=>{
    console.log('Server running in 5050')
})