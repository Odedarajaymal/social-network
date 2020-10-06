
export const updateuser = (user,next) => {
  if(localStorage.getItem('jwt')){
      let auth = JSON.parse(localStorage.getItem('jwt')) 
     auth.user = user
     localStorage.setItem('jwt',JSON.stringify(auth)) 
     next()
  }
}