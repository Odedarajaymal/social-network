import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
class Signin extends Component {
     state = {
         email:'',
         password:'',
         error:'',
         Redirectto:false
     }

     Authencate = (jwt,next)=>{
         if(typeof window !== 'undefined'){
            localStorage.setItem('jwt',JSON.stringify(jwt))
            next()
         }
         
     }
    handleChange = (name)=> (event)=>{
        this.setState({[name]:event.target.value})
    }
    handleChange = (name)=>(event)=>{
        this.setState({error:''})
        this.setState({[name]:event.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {email,password} = this.state
        const user = {
         
            email,
            password
        }
       
      this.Signin(user)
      .then(data=>{
          if(data.error)return this.setState({error:data.error})
          else {
              this.Authencate(data, ()=>{
                  this.setState({Redirectto:true})
              })
          }
      })
    }

    Signin = (user)=>{
     return  fetch('http://localhost:5050/signin',{
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
        const {email,password,error,Redirectto} = this.state
          if(Redirectto){
              return <Redirect to='/'/> 
          }
        return (
            <div style={{marginRight:'30px'}} className ="container">
               <h1 className ="mt-5 mb-3">Signin</h1>
               <hr />
                <SocialLogin />
                     <hr />
               <div style={{display:error ? '':'none'}} className="alert alert-danger">{error}</div>
               <form className="row">
                   <div className="col-md-12">
                   <div className="form-group">
                      <label className="text-muted">email</label>
                       <input onChange={this.handleChange('email')}  type="email" value={email} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">password</label>
                       <input onChange={this.handleChange('password')}  type="password" value={password} className="form-control"/>
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>
                   </div>
               </form>
               <p>
     <Link to="/forgot-password" className="btn btn-raised btn-warning">
       {" "}
       Forgot Password
    </Link>
</p> 
            </div>
        )
    }
}

export default Signin