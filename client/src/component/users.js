import React,{Component} from 'react';
import avatars from '../image/avatar.png'
import {Link} from 'react-router-dom'

class Users extends Component {
    state = {
        users: [],
    }
    componentDidMount(){
       return fetch(`http://localhost:5050/showalluser`,{
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then(data => {
            if(data.error){
             console.log(data.error)
            }else{
             this.setState({ users:data})
            }
            
        }).catch(e=>{
            console.log(e)
        })
        
     }
    render() {
        const { users } = this.state
        return(
            <div className="container">
                <h1 className="mt-5 mb-5">Users</h1>
                <div className="row">
                {users.map((user,i)=>
                   (
                    <div key={i} className="card col-md-4" style={{width: "18rem;"}}>
                  <img style={{height:'200px',width:'auto'}} className='img-thumbnail' src={`http://localhost:5050/user/photo/${user._id}`} onError={i=>(i.target.src=`${avatars}`)} alt={users.name}/>
                    <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                      <p className="card-text">{user.email}</p>
                      <Link to={`/user/${user._id}`}   className="btn btn-raised btn-primary btn-sm">View Profile</Link>
                    </div>
                  </div>
                   )
                )}   
                 </div>
            </div>
        )
    }
}

export default Users