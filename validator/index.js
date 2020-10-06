module.exports = (req, res,next) => {
  req.check('name','title is required').notEmpty()  
  req.check('email','email is required').notEmpty() 
  req.check('email','email is not valid').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  req.check('password','password is required').notEmpty() 
  req.check('password','passwors length minimum 5 and maximum 55').isLength({
      min:5,max:55
  }) 
  
  const errors = req.validationErrors()
  if(errors) {
      const firstError = errors.map(error => error.msg)[0]
      return res.json({error:firstError})   
  }              
  next()
}