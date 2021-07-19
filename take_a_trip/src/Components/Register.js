import React, { Component } from "react";
import {Message} from 'primereact/message';
import {backendUrlRegister} from '../BckendURL';
import "../custom.css";
import axios from 'axios';

class Register extends Component{

    state = {
        successMessage: "",
        errorMessage: "",
        
        formValue:{
            userName:"",
            emailId:"",
            contactNumber:"",
            password:""
        },

        formErrorMessage:{
            userName:"",
            emailId:"",
            contactNumber:"",
            password:""
        },

        formValid :{
            userName:false,
            emailId:false,
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

            case "userName":
                const userNameregex= /^(((?<!^)\s(?!$)|[-a-zA-Z])*)$/;
                if(value === ""){
                    formValidationError.userName = "Field Required";
                    formValid.userName = false;
                }
                else if(!value.match(userNameregex)){
                    formValidationError.userName = "UserName should contain only alphabates and should not start and end with space";
                    formValid.userName = false;
                }else{
                    formValidationError.userName = "";
                    formValid.userName = true;
                }
                break;

                case "emailId":
                    const emailIdregex= /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if(value === ""){
                        formValidationError.emailId = "Field Required";
                        formValid.emailId= false;
                    }
                    else if(!value.match(emailIdregex)){
                        formValidationError.emailId = "Please enter vlid email id";
                        formValid.emailId = false;
                    }else{
                        formValidationError.emailId = "";
                        formValid.emailId = true;
                    }
                    break;

            case "contactNumber":
                const contactNumberRegex = /^[6-9][0-9]{9}$/;
                if(value === ""){
                    formValidationError.contactNumber = "Field Required";
                    formValid.contactNumber = false;
                }
                else if(!value.match(contactNumberRegex)){
                    formValidationError.contactNumber = "Plaese enter valid indian Mobile Number";
                    formValid.contactNumber = false;
                }
                else{
                    formValidationError.contactNumber = "";
                    formValid.contactNumber = true;
                }
                break;

            case "password":
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if(value === ""){
                    formValidationError.password = "Field Required";
                    formValid.password=false;
                }
                else if(!value.match(passwordRegex)){
                    formValidationError.password = "password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character, minimum length is 8";
                    formValid.password = false;
                }

                else{
                    formValidationError.password="";
                    formValid.password=true;
                }
                break;
        }

        formValid.ButtonActive = formValid.contactNumber && formValid.password && formValid.userName && formValid.emailId;

        this.setState({
            formErrorMessage:formValidationError,
            formValid: formValid,
            successMessage: "",
            errorMessage: ""
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.register();
    }

    register = () => {
        const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});

        axios.post(backendUrlRegister,formValue)
        .then(
            response => {
                console.log(response.data);
                this.setState({errorMessage : "", successMessage : response.data})
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
            <div id="content" class="flex" style = {{"textAlign":"center", "marginTop" : -125}}>
    <div class="">
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header"><strong>Register Yourself</strong></div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label class="text-muted" for="userName">Name</label>
                                        <input type="text" class="form-control" id="userName" name = "userName" placeholder="Enter name" onChange = {this.handlechange}/>
                                        <Message severity = "error" text = {this.state.formErrorMessage.userName} style = {{"color" : "red"}}></Message>
                                    </div>
                                    <div class="form-group">
                                        <label class="text-muted" for="contactNumber">Phone Number</label>
                                        <input type="text" class="form-control" id="contactNumber" name ="contactNumber" placeholder="Enter phone number" onChange = {this.handlechange}/>
                                        <Message severity = "error" text = {this.state.formErrorMessage.contactNumber} style = {{"color" : "red"}}></Message>
                                    </div>
                                    <div class="form-group">
                                        <label class="text-muted" for="emailId">Email address</label>
                                        <input type="email" class="form-control" id="emailId" name = "emailId" aria-describedby="emailHelp" placeholder="Enter email" onChange = {this.handlechange}/> 
                                        <small id="emailHelp" class="form-text text-muted">We don't share email with anyone</small>
                                        <Message severity = "error" text = {this.state.formErrorMessage.emailId} style = {{"color" : "red"}}></Message>
                                    </div>
                                    <div class="form-group">
                                        <label class="text-muted" for="password">Password</label>
                                        <input type="password" class="form-control" id="password" name = "password" placeholder="Password" onChange = {this.handlechange}/>
                                        <small id="passwordHelp" class="form-text text-muted">your password is saved in encrypted form</small>
                                        <Message severity = "error" text = {this.state.formErrorMessage.password} style = {{"color" : "red"}}></Message>
                                    </div>
                                    
                                    <button type="submit" class="btn btn-primary" disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Sign Up</button>
                                </form>
                                <a href= "/login">Already registered?</a><br/>

                                {(this.state.successMessage.trim().length > 0 )?
                                    <div class="alert alert-success" role="alert">
                                        {this.state.successMessage}
                                    </div>:<></>
                                }

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

export default Register;