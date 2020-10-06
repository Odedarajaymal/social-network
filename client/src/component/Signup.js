import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import mk from '../image/mk.png'
class Signup extends Component{
    state ={
     name:'',
     email:'',
     password:'',
     error:'',
     open:false
    }

    handleChange = (name)=>(event)=>{
        this.setState({error:''})
        this.setState({[name]:event.target.value})
    }
   
    handleSubmit = (e)=>{
        e.preventDefault()
        const {name,email,password} = this.state
        const user = {
            name,
            email,
            password
        }
       
      this.Signup(user)
      .then(data=>{
          if(data.error) return  this.setState({error:data.error})
          else this.setState({
              error:'',
              name:'',
              email:'',
              password:'',
              open:true
          })
      })
    }

    Signup = (user)=>{
     return  fetch('http://localhost:5050/signup',{
            method:'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res =>{
            return res.json()
        }).catch(err => console.log(err))
    }

    render() { 
        const {name,error,email,password,open} = this.state
        return (
            <div style={{marginRight:'30px'}} className="container">
                <h2 className="mt-5 mb-3">Signup</h2>
                <div style={{display:error ? '':'none'}} className="alert alert-danger">{error}</div>
                <div style={{display:open ? '':'none'}} className="alert alert-primary">New Account successfully created. Please <Link to={"/signin"}>Signin</Link> </div>
                <div className='row'>
                <form className='col-md-6'>
                
                <div className="form-group"> 
                      <label className="text-muted">name</label>
                       <input onChange={this.handleChange('name')} type="text" value={name} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">email</label>
                       <input onChange={this.handleChange('email')} type="email" value={email} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">password</label>
                       <input onChange={this.handleChange('password')} type="password" value={password} className="form-control"/>
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>
                    
                </form>
                   <vr/>
                <div className="col-md-6">
                
                <div> 
                                     <h1 className="text-primary ml-5 mb-3 text-bold">Welcome To</h1>
                                     <img src={mk} className="rounded mx-auto d-block ml-5" style={{height:'75%',width:'75%',marginRight:'10px',border:' 1px solid primary'}}  alt="Welcome to Skyblue"/>
                                </div>
              
                                
                           
                      </div>
                </div>
            
               
            </div>
        )
    }
} 
   

export default Signup