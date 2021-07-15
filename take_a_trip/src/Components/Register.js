import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom.css";

class Register extends Component{
    render(){
        return(
            <div id="content" class="flex" style = {{"textAlign":"center"}}>
    <div class="">
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header"><strong>Register Yourself</strong></div>
                            <div class="card-body">
                                <form>
                                <div class="form-group"><label class="text-muted" for="name">Name</label><input type="text" class="form-control" id="name" placeholder="Enter name"/></div>
                                <div class="form-group"><label class="text-muted" for="phone">Phone Number</label><input type="text" class="form-control" id="phone" placeholder="Enter phone number"/></div>
                                    <div class="form-group"><label class="text-muted" for="email">Email address</label><input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/> <small id="emailHelp" class="form-text text-muted">We don't share email with anyone</small></div>
                                    <div class="form-group"><label class="text-muted" for="password">Password</label><input type="password" class="form-control" id="password" placeholder="Password"/> <small id="passwordHelp" class="form-text text-muted">your password is saved in encrypted form</small></div>
                                    
                                    <button type="submit" class="btn btn-primary">Sign Up</button>
                                </form>
                                <a href= "/login">Already registered?</a>
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

export default Register;