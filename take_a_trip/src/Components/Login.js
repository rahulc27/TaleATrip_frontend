import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Message} from 'primereact/message';
import "../custom.css";

class Login extends Component{
    render(){
        return(
            <div id="content" class="flex" style = {{"textAlign":"center"}}>
    <div class="">
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header"><strong>Login to your account</strong></div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label class="text-muted" for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                        <Message severity = "error" text = "required field" style = {{"color" : "red"}}></Message>
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label class="text-muted" for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>
                                    <br/>
                                    <br/>
                                    
                                    <button type="submit" class="btn btn-primary">Sign in</button>
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