import React, { Component } from "react";
import "../custom.css";
import { Redirect } from "react-router-dom";

class Home extends Component{
    state = {
        continent : "",
        packagePage : false
    }

    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name] : value});
        
    };

    getPckages = e =>{
        e.preventDefault();
        this.redirect(e);
        
    }

    redirect = e =>{
        if(e.key === "Enter" || e.target.value === "Searchtour"){
            if(this.state.continent !== ""){
                this.setState({packagePage : true});
            }
        }
    }

    render(){
        if(this.state.packagePage === true){
            console.log(this.state.continent)
            return <Redirect to ={"/packages/" + this.state.continent}></Redirect>
        }
        return(
            
            <div class="row justify-content-center padding">
                <div class="col-md-8 ftco-animate fadeInUp ftco-animated">
                    <form action="#" class="domain-form">
                        <div class="form-group d-md-flex"> 
                            <input type="text" class="form-control px-4" placeholder="Enter your destination name..." name = "continent" onChange = {this.handlechange}/> 
                            <input type = "submit" class="search-domain btn btn-primary px-5" value="Searchtour" onClick = {this.getPckages}/>
                        </div>
                    </form>
                    
                </div>
            </div>
            
        );
    }
}

export default Home;
