import React, { Component } from "react";
import "../custom.css";

class Home extends Component{
    render(){
        return(
            <div class="row justify-content-center padding">
    <div class="col-md-8 ftco-animate fadeInUp ftco-animated">
        <form action="#" class="domain-form">
            <div class="form-group d-md-flex"> <input type="text" class="form-control px-4" placeholder="Enter your destination name..."/> <input type="submit" class="search-domain btn btn-primary px-5" value="Search tour"/> </div>
        </form>
        
    </div>
</div>
        );
    }
}

export default Home;
