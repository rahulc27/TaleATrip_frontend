import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {backendUrlFindByDiscount} from '../BckendURL';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCard from "./Card";

class Hotdeals extends Component{
    
    constructor(){
        super()
        this.state={
            packages : [],
            errorMessage : "",
            successMessage : ""
        }
    }

    componentWillMount(){
        this.fetchPackages();
    }

    fetchPackages = () => {
        this.setState({errorMessage:"", successMessage:""});

        axios.get(backendUrlFindByDiscount)
        .then(
            response => {
                this.setState({packages : response.data});
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
        console.log(this.state.packages);
        var packages = this.state.packages;
        if(packages.length > 0){
            return(
                <div className = "masrhead book-page" id = "HomeSearch">
                    {
                        packages.map(item => (
                            <CreateCard key = {item.destinationId} package = {item}></CreateCard>
                        ))
                    }
                </div>
            )

        }
        return(
            <div class="alert alert-primary" role="alert">
                {this.state.errorMessage} <a href = "/" className = "alert=link">Click here tho search other continent</a>
            </div>   
        )
    }
}

export default Hotdeals;