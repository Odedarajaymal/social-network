import {listPosts,delet, like, unlike} from '../postapi/api'
import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import DefaultPost from "../image/default.jpg";
import {authenticate } from '../component/nav'
import Comment from './comment';

class ListPosts extends Component {
     state = {
         post:'',
         redirectToHome:false,
         redirectToSignin: false,
         like:false,
         likes:0,
         comments: []
     }

     delete = () => {
        const postId = this.props.match.params.postId;
        const token = authenticate().token;
        delet(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };


    deleteuser = () => {
        let user = window.confirm("Are you sure you want to delete")
        if(user){
            this.delete()
        }
    }



    likeToggle = () => { 
        if (!authenticate()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
      
        let callApi = this.state.like ? unlike : like;
        const userId = authenticate().user._id;
        const postId = this.state.post._id;
        const token = authenticate().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };  

    updateComments = comments => {
        this.setState({ comments });
    };

    checkLike = likes => {
        const userId = authenticate() && authenticate().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        listPosts(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    post:data,
                    likes:data.likes.length,
                    like: this.checkLike(data.likes),
                });
            }
        });
    };
    render(){
        const {post,redirectToHome,redirectToSignin,likes,like,comments} = this.state
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
            const posterName = post.postedBy
                ? post.postedBy.name
                : " Unknown";
                const userpost = post.postedBy
                ? `${post.postedBy._id}`
                : "";    

                if (redirectToHome) {
                    return <Redirect to={`/`} />;
                } else if (redirectToSignin) {
                    return <Redirect to={`/signin`} />;
                }  
              
        return (
            <div className= 'container'>
                   <h1 className ='text-primary mt-3'>{post.title}</h1> 
                  <div className="card">
                            <div className="card-body">
                            <img style={{ height: "300px", width: "500%", objectFit:'cover' }}className='img-thumbnail mb-3' src={`http://localhost:5050/post/photo/${post._id}`} onError={i=>(i.target.src=`${DefaultPost}`)} alt={post.title}/>
                                 
        -                        {like ? (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-success bg-dark"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-warning bg-dark"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>  
                )}
                                <p className="card-text">
                                    {post.body}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
                        Back to posts
                    </Link>

                    {authenticate().user && authenticate().user._id === userpost && (
                        <>   
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
                                Update Post
                            </Link>
                            <button onClick={this.deleteuser} className="btn btn-raised btn-danger">
                                Delete Post
                            </button>
                        </>
                    )}      
                    <div>
    {authenticate().user &&
        authenticate().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-warning btn-sm mr-5"
                    >
                        Update Post
                    </Link>
                    <button
                        onClick={this.deleteuser}
                        className="btn btn-raised btn-danger"
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        )}
</div>
                               
                                 </div>
                            </div>
                        </div> 

                        <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />     
            </div>
        )
    }
}

export default ListPosts