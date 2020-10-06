import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import DefaultPost from "../image/default.jpg";
class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
         
        };
    }
    componentDidMount(){
       return fetch(`http://localhost:5050/showallposts`,{
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then(data => {
            if(data.error){
             console.log(data.error)
            }else{
             this.setState({ posts:data})
            }
            
        }).catch(e=>{
            console.log(e)
        })
        
     }

     renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";
                          console.log(post._id)
                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                            <img   style={{ height: "200px", width: "100%" }}className='img-thumbnail mb-3' src={`http://localhost:5050/post/photo/${post._id}`} onError={i=>(i.target.src=`${DefaultPost}`)} alt={post.title}/>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state
        return(
            <div className="container">
                <h1 className="mt-5 mb-5">Recent Posts</h1>   
                {this.renderPosts(posts)}  
            </div>
        )
    }
}

export default Posts