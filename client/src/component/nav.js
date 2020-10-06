import React from 'react'
import {Link,withRouter} from 'react-router-dom'

const ishistory = (history,path) =>{
  if(history.location.pathname === path)return {color:'black'}
  else  return {color:'white'}
}
   
export const isSignout = (next) =>{
    localStorage.removeItem('jwt')
    next()
    return fetch('http://localhost:5050/signout',{
        method: 'GET',
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const authenticate = ()=>{
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    } else{
        return false
    }

}

const Nav = ({history})=>{
    return(
        <div>
         <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                 <Link className='nav-link'style={ishistory(history,'/')} to='/'>Home</Link>
         </li>
         <li className="nav-item">
                 <Link className='nav-link'style={ishistory(history,'/users')} to='/users'>Users</Link>
         </li>
         {!authenticate() && <>
            <li className="nav-item">
                <Link className='nav-link ' style={ishistory(history,'/Signup')} to='/Signup'>Signup</Link>
         </li>
         <li className="nav-item">
            <Link className='nav-link' style={ishistory(history,'/Signin')} to='/Signin'>Signin</Link>
         </li>
         </>}
         
        {authenticate() && ( <> <li className="nav-item">
                         
                        <Link
                            to={`/user/${authenticate().user._id}`}
                            style={ishistory(history, `/user/${authenticate().user._id}`)}
                            className="nav-link"
                        >
                            {`${authenticate().user.name}'s profile`}
                        </Link>
                    </li>
                    <li className="nav-item">
                     <Link className='nav-link' style={ishistory(history,`/post/new/${authenticate().user._id}`)} to={`/post/new/${authenticate().user._id}`}>Create Post</Link>
                         </li>
                    <li className="nav-item"></li>
                    <li className="nav-item">
                     <Link className='nav-link' style={ishistory(history,`/user/findpeople/${authenticate().user._id}`)} to={`/user/findpeople/${authenticate().user._id}`}>Suggestion</Link>
                         </li>
                         {authenticate() && authenticate().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={ishistory(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
)}    
                    <li className="nav-item ">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => isSignout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>
                    </>    
         )}
       
      
        </ul>
        </div>
    )
}

export default withRouter(Nav)



      
