import React, { Component } from 'react'
import {authenticate } from './nav'
import {Redirect} from 'react-router-dom';
import DefaultPost from "../image/default.jpg";

class EditPost extends Component {
  state = {
      title: '',
      id: '',
      body: '',
      error: '',
      redirectUrl: false,
      filesize:0,
  }
  
isValid = () => {
    const {title,filesize} = this.state
    if(filesize>1000000){
        this.setState({error:'filesize must be less than 100kb'})
        return false
    }
    if(title.length === 0){
        this.setState({error:'title is required'})
        return false
    }

 return true
}
  handleChange = (name)=>(event)=>{
    this.setState({ error: "" });
      const  value = name === 'photo'?event.target.files[0]:event.target.value
      const filesize = name === 'photo'?event.target.files[0].size:0
      this.postData.set(name, value)
    this.setState({[name]:value,filesize})
}
 
handleSubmit = (e)=>{
    e.preventDefault()
    if(this.isValid()){
  
    this.Update(this.postData)
    .then(data=>{
        if (data.error) this.setState({ error: data.error });
        else {
            this.setState({
                loading: false,
                title: "",
                body: "",
                redirectUrl: true
            });
        }
            
    })
}
    }
    
    
  Update = (post)=>{
            const postId = this.props.match.params.postId
            return  fetch(`http://localhost:5050/post/${postId}`,{
                   method:'PUT',
                   headers: {
                       Authorization:`Bearer ${authenticate().token}`,
                   },
                   body: post
               }).then(res =>{
                   return res.json()
               }).catch(err => console.log(err))
           }
      



    componentDidMount(){
        this.postData = new FormData()
        const postId = this.props.match.params.postId
       return fetch(`http://localhost:5050/post/${postId}`,{
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
             this.setState({ title:data.title, body:data.body,id:data._id})
            }
            
        }).catch(e=>{
         this.setState({redirectUrl:true});
        })
        
     }
     
    render() {
        const {title,body, redirectUrl,id,error,} = this.state
        if(redirectUrl) return <Redirect to={`/post/${id}`}/>
        const photoURL = id?`http://localhost:5050/post/photo/${id}?${new Date().getTime()}`: DefaultPost
        
        return (
            <div className='container'>
                <h1 className='mt-5 mb-5'>Edit Post</h1>
                <div style={{display:error ? '':'none'}} className="alert alert-danger">{error}</div>
                <img style={{height:'200px',width:'auto'}} className='img-thumbnail' src={photoURL} alt={title}/>
                <form>
                <div className="form-group"> 
                      <label className="text-muted">Post Photo</label>
                       <input onChange={this.handleChange('photo')} style={{width:'50%'}} type="file" accept="image/*" className="form-control"/>
                    </div>
                    <div className="form-group"> 
                      <label className="text-muted">title</label>
                       <input onChange={this.handleChange('title')} style={{width:'50%'}} type="text" value={title} className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="text-muted">body</label>
                       <input onChange={this.handleChange('body')} style={{width:'50%'}} type="text" value={body} className="form-control"/>
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Update Post</button>
                </form>
               
            </div>
        )
    }
}

export default EditPost