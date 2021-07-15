import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";

class Login extends Component{
    render(){
        return(
            <div id="content" class="flex" style = {{"textAlign":"center"}}>
    <div class="">
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header"><strong>Login to your account</strong></div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group"><label class="text-muted" for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/> <small id="emailHelp" class="form-text text-muted">We don't share email with anyone</small></div>
                                    <div class="form-group"><label class="text-muted" for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/> <small id="passwordHelp" class="form-text text-muted">your password is saved in encrypted form</small></div>
                                    
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                                <a href= "/register">New user?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        );
    }
}

export default Login;