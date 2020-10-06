import React,{Component} from 'react';
import avatars from '../image/avatar.png'
import {Link} from 'react-router-dom'
import {authenticate } from './nav'
import {follow} from '../api/follow'

class Findpeople extends Component {
    state = {
        users: [],
        error: "",
        open: false
    }
    componentDidMount(){
       return fetch(`http://localhost:5050/user/findpeople/${authenticate().user._id}`,{
            method: 'GET',
            headers: {
                Authorization:`Bearer ${authenticate().token}`,
            }
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
     clickFollow = (user, i) => {
        const userId = authenticate().user._id;
        const token = authenticate().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };
    render() {
        const { users,  followMessage, open } = this.state
        return(
            <div className="container">
                     <h2 className="mt-5 mb-5">Find People</h2>

                {open && (
                        <div className="alert alert-success">{followMessage}</div>
                    )}
                <div className="row">
               
                {users.map((user,i)=>
                   (
                    <div key={i} className="card col-md-4" style={{width: "18rem;"}}>
                  <img style={{height:'200px',width:'auto'}} className='img-thumbnail' src={`http://localhost:5050/user/photo/${user._id}`} onError={i=>(i.target.src=`${avatars}`)} alt={users.name}/>
                    <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                      <p className="card-text">{user.email}</p>
                      <Link to={`/user/${user._id}`}   className="btn btn-raised btn-primary btn-sm">View Profile</Link>
                      <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn btn-raised btn-info float-right btn-sm"
                        >
                            Follow
                        </button>
                    </div>
                  </div>
                   )
                )}   
                 </div>
            </div>
        )
    }
}

export default Findpeople