
const expressJwt = require('express-jwt')
require('dotenv').config()


exports.auth =  expressJwt({
        secret:process.env.Jwt_secret,
        userProperty:'auth',
        algorithms: ['HS256'],
})
    

  

