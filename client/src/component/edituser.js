import React, { Component } from 'react'
import {authenticate } from './nav'
import {Redirect} from 'react-router-dom';
import avatars from '../image/avatar.png'
import {updateuser} from '../Auth/user'
class Update extends Component {
  state = {
      name: '',
      id: '',
      email: '',
      password:''|| undefined,
      error: '',
      redirectUrl: false,
      filesize:0,
      about:''
  }
  
isValid = () => {
    const {email,name,filesize} = this.state
    if(filesize>1000000){
        this.setState({error:'filesize must be less than 100kb'})
        return false
    }
    if(name.length === 0){
        this.setState({error:'name is required'})
        return false
    }
    if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
     this.setState({error:'email is not a valid'})
     return false
 }

 return true
}
  handleChange = (name)=>(event)=>{
    this.setState({ error: "" });
      const  value = name === 'photo'?event.target.files[0]:event.target.value
      const filesize = name === 'photo'?event.target.files[0].size:0
      this.userData.set(name, value)
    this.setState({[name]:value,filesize})
}
 
handleSubmit = (e)=>{
    e.preventDefault()
    if (this.isValid()) {
       
        this.Update( this.userData).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else if (authenticate().user.role === "admin") {
            this.setState({
                redirectUrl: true
            });
          } else {
            updateuser(data, () => {
              this.setState({
                redirectUrl: true
              });
            });
          }
        });
      }
    }
    
    
  Update = (user)=>{
            console.log('userdata',user)
            const userId = this.props.match.params.userId
            return  fetch(`http://localhost:5050/user/${userId}`,{
                   method:'PUT',
                   headers: {
                       Authorization:`Bearer ${authenticate().token}`,
                   },
                   body: user
               }).then(res =>{
                   return res.json()
               }).catch(err => console.log(err))
           }
      



    componentDidMount(){
        this.userData = new FormData()
        const userId = this.props.match.params.userId
       return fetch(`http://localhost:5050/user/${userId}`,{
            method: 'GET',
            headers:{
             Accept: 'application/json',
             'Content-Type': 'application/json',
             Authorization:`Bearer ${authenticate().token}`,
            }
            
        }).then((response) => {
            return response.json()
        }).then(data => {
            if(data.error){
             this.setState({redirectUrl:true});
            }else{
             this.setState({ name:data.name, email:data.email,id:data._id,about:data.about})
            }
            
        }).catch(e=>{
         this.setState({redirectUrl:true});
        })
        
     }
     
    render() {
        const {name,email,password, redirectUrl,id,error,about} = this.state
        if(redirectUrl) return <Redirect to={`/user/${id}`}/>
        const photoURL = id?`http://localhost:5050/user/photo/${id}?${new Date().getTime()}`: avatars
        
        return (
            <div className='container'>
                <h1 className='mt-5 mb-5'>Edit Profile</h1>
                <div style={{display:error ? '':'none'}} className="alert alert-danger">{error}</div>
                <img style={{height:'200px',width:'auto'}} className='img-thumbnail' src={photoURL} alt={name}/>
                <form>
                <div className="form-group"> 
                      <label className="text-muted">Profile Photo</label>
                       <input onChange={this.handleChange('photo')} style={{width:'50%'}} type="file" accept="image/*" className="form-control"/>
                    </div>
                    <div className="form-group"> 
                      <label className="text-muted">name</label>
                       <input onChange={this.handleChange('name')} style={{width:'50%'}} type="text" value={name} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">email</label>
                       <input onChange={this.handleChange('email')} style={{width:'50%'}} type="email" value={email} className="form-control"/>
                    </div>
                    <div className="form-group"> 
                      <label className="text-muted">about</label>
                       <textarea onChange={this.handleChange('about')} style={{width:'50%'}} type="text" value={about} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">password</label>
                       <input onChange={this.handleChange('password')} style={{width:'50%'}} type="password" value={password} className="form-control"/>
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Update</button>
                </form>
               
            </div>
        )
    }
}

export default Update