import React, { Component } from 'react'
import {authenticate } from './nav'
import {Link,Redirect} from 'react-router-dom'
import avatars from '../image/avatar.png'
import Delete from './deleteuser'
import Follow from './follow'
import ProfileTab from './profileTab'
import {postby} from '../postapi/api'
class Profile extends Component {
    state = {
        user:{following:[],followers:[]},
        redirectUrl:false,
        following:false,
        error:'',
        posts:[]
    }
    check = (user)=>{
        const jwt = authenticate()
          const match = user.followers.find(follower=>{
              return follower._id === jwt.user._id
          }) 
          return match
    }

    
clickFollowButton = callApi => {
    const userId = authenticate().user._id;
    const token = authenticate().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };
componentDidMount(){
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
        let following= this.check(data)
        this.setState({ user:data,following})
        this.onepost(data._id)
       }
       
   }).catch(e=>{
    this.setState({redirectUrl:true});
   })
   
}
   onepost = (userId)=>{
    const token = authenticate().token;
        postby(userId,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({posts:data})
            }
        })

        

   }

componentWillReceiveProps(props){ 
    const userId = props.match.params.userId
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
         this.setState({ user:data })
        }
        
    }).catch(e=>{
     this.setState({redirectUrl:true});
    })
    
 }
    render() {
        const { redirectUrl,user,posts} = this.state
        if(redirectUrl){
          return  <Redirect to='/signin' />
        }
        const photoURL = user._id?`http://localhost:5050/user/photo/${user._id}?${new Date().getTime()}`: avatars
        return (
            <div className ='container'>
                <h1 className='mt-5 mb-5'>Profile</h1>
                <div className ='row'>
                    <div className ='col-md-4'>
                    <img style={{height:'200px',width:'auto'}} className='img-thumbnail'  src={photoURL} onError={i=>(i.target.src=`${avatars}`)} alt={user.name}/>
                    </div>
                    <div className="col-md-6">
                        <div style={{marginRight:'20px'}} className="lead">
                         <p>{user.name}</p>
                         <p>{user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {authenticate().user && authenticate().user._id === this.state.user._id ? (
                            
                              <div className="d inline-blok mt-5">
                                   <Link to={`/post/new/${this.state.user._id}`} className='btn btn-raised btn-info mr-5'>create Post</Link>
                                <Link to={`/user/edit/${this.state.user._id}`} className='btn btn-raised btn-success mr-5'>Edit Profile</Link>
                                <Delete userId={user._id}/>
                            </div>
                        ):<Follow   following={this.state.following}
                        onButtonClick={this.clickFollowButton}/>}
                         <div>
    {authenticate().user &&
       authenticate().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">
                        Admin
                    </h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${this.state.user._id}`}
                    >
                        Edit Profile
                    </Link>
                    <Delete  userId={user._id} />
                </div>
            </div>
        )}
</div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr/>
                            <p className="lead">{user.about}</p>
                            <hr/>
                            <ProfileTab posts={posts} following={user.following} followers={user.followers} />
                        </div>
                    </div>
            </div>
        )
    }
}

export default Profile