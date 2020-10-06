import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './component/home'
import Signup from './component/Signup'
import Signin from './component/Signin'
import Nav from './component/nav'
import Profile from './component/profile'
import Users from './component/users'
import Update from './component/edituser'
import Privateroute from './component/privateroute'
import Findpeople from './component/findpeople'
import NewPost from './postapi/newpost'
import ListPosts from './postapi/singlepost'
import EditPost from './component/editpost'
import ForgotPassword from './component/forgetpass.js'
import ResetPassword from './component/resetpass.js'
import Admin from './component/admin'
const Router = ()=>{
    return(
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Privateroute exact path="/user/:userId" component={Profile} />
                <Privateroute exact path="/user/findpeople/:userId" component={Findpeople} />
                <Route exact path="/user/edit/:userId" component={Update} />
                <Route exact path="/post/edit/:postId" component={EditPost} />
                <Route exact path="/post/new/:userId" component={NewPost} />
                <Route exact path="/post/:postId" component={ListPosts} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Privateroute exact path="/admin" component={Admin} />
                <Route
         exact
         path="/reset-password/:resetPasswordToken"
            component={ResetPassword}
                />
            </Switch>
          
        </div>
    )
}       

export default Router