import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Message} from 'primereact/message';
import "../custom.css";
import {backendUrlLogin} from '../BckendURL';
import axios from 'axios';

class Login extends Component{

    state = {
        successMessage: "",
        errorMessage: "",
        
        formValue:{
            contactNumber:"",
            password:""
        },

        formErrorMessage:{
            contactNumber:"",
            password:""
        },

        formValid :{
            contactNumber:false,
            password:false,
            ButtonActive:false
        }

    }

    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
        const {formValue} = this.state;
        this.setState({formValue : {...formValue,[name] : value} } );
        this.validateData(name,value);
    };

    validateData = (fieldname,value) => {
        let formValidationError = this.state.formErrorMessage;
        let formValid = this.state.formValid;

        switch(fieldname){
            case "contactNumber":
                if(value === ""){
                    formValidationError.contactNumber = "Field Required";
                    formValid.contactNumber = false;
                }
                else if(value.length != 10){
                    formValidationError.contactNumber = "Plaese enter valid Mobile Number";
                    formValid.contactNumber = false;
                }
                else{
                    formValidationError.contactNumber = "";
                    formValid.contactNumber = true;
                }
                break;

            case "password":
                if(value === ""){
                    formValidationError.password = "Field Required";
                    formValid.password=false;
                }
                else{
                    formValidationError.password="";
                    formValid.password=true;
                }
                break;
        }

        formValid.ButtonActive = formValid.contactNumber && formValid.password;

        this.setState({
            formErrorMessage:formValidationError,
            formValid: formValid,
            successMessage: "",
            errorMessage: ""
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.authenticate();
    }

    authenticate = () => {
        const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});

        axios.post(backendUrlLogin,formValue)
        .then(
            response => {
                console.log(response.data);
                
                sessionStorage.setItem("userId", response.data.userId);
                sessionStorage.setItem("userName", response.data.userName);
                window.location.href = "/";
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    this.setState({errorMessage : error.response.data.message, successMessage : ""})
                }
                else{
                    this.setState({errorMessage : "Please Check Your Details or Try Again Later", successMessage : ""})
                }
                
            });
    }

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
                                        <label class="text-muted" for="contactNumber">Mobile Number</label>
                                        <input type="text" class="form-control" id="contactNumber" name = "contactNumber" placeholder="Enter email"  onChange = {this.handlechange}/>
                                        <Message severity = "error" text = {this.state.formErrorMessage.contactNumber} style = {{"color" : "red"}}></Message>
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label class="text-muted" for="password">Password</label>
                                        <input type="password" class="form-control" id="password" name = "password" placeholder="Password" onChange = {this.handlechange}/>
                                        <Message severity = "error" text = {this.state.formErrorMessage.password} style = {{"color" : "red"}}></Message>
                                    </div>
                                    <br/>
                                    <br/>
                                    
                                    <button type="submit" class="btn btn-primary" disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Sign in</button>
                                </form>
                                <a href= "/register">New user?</a>
                                
                                {(this.state.errorMessage.trim().length > 0 )?
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>:<></>
                                }
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