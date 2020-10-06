import React,{ Component} from 'react'
import {authenticate,isSignout } from './nav'
import {Redirect} from 'react-router-dom';

class Delete extends Component{
   state ={
       redirect:false
   }      

    delete = () =>{
        const userId = this.props.userId
  return fetch(`http://localhost:5050/user/${userId}`,{
       method: 'DELETE',
       headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:`Bearer ${authenticate().token}`,
       }
       
   }).then((response) => {
       return response.json()
   }).then(data => {
       if(data.error){
         console.log(data.error)
       }else{
        isSignout(()=>console.log('user has deleted'))
        this.setState({redirect:true})
       }
       
   }).catch(e=>{
      console.log(e)
   })
}


    deleteuser = () => {
        let user = window.confirm("Are you sure you want to delete")
        if(user){
            this.delete()
        }
    }
    render(){
        const {redirect} = this.state
        if(redirect){
            return <Redirect to={'/'}/>
        }
        return (
            <button onClick={this.deleteuser} className='btn btn-raised btn-danger'>Delete</button>
    )
    }
    
}

export default Delete