import React, { Component } from "react";
import {backendUrlBooking} from '../BckendURL';
import axios from 'axios';
import "../booking.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Booking extends Component{

    state = {
        successMessage: "",
        errorMessage: "",
        
        formValue:{
            noOfPeople:"",
            checkIn:"",
            checkOut:"",
            totalCost:"",
            userDTO:{userId:sessionStorage.getItem("userId")},
            destinationDTO:{destinationId:this.props.location.state.data.destinationId}
        },

        formErrorMessage:{
            noOfPeople:"",
            checkIn:"",
            
        },

        formValid :{
            
            ButtonActive:false
        },

        noOfNights:"",
        chargePerPerson:"",
        destinationName:"",
        discount:""

    }

    handlechange = e =>{
        var checkIn = e.target.value;
        const {formValue} = this.state;

        if(e.target.name === "checkIn"){
            var checkInDate = new Date(checkIn);
            
            checkInDate.setDate(checkInDate.getDate() + this.state.noOfNights);

            var checkOut = this.createDateToString(checkInDate);

            console.log(checkIn);
            console.log(checkOut);

            this.setState({
                formValue:{
                    ...formValue,
                    checkIn:checkIn,
                    checkOut:checkOut
                },
                formValid:{
                    ButtonActive:true
                }
            })

        }else if(e.target.name === "noOfPeoples"){
            console.log(e.target.value);
            var noOfPeople = parseInt(e.target.value);
            var costPerPerson = parseInt(this.state.chargePerPerson);
            var totalCost = noOfPeople * costPerPerson;

            this.setState({costBedoreDiscount: totalCost});

            totalCost = parseInt(totalCost * (1 - parseFloat(this.state.discount)/100))
            
            noOfPeople = noOfPeople.toString();
            totalCost = totalCost.toString();
            

            this.setState({
                formValue:{
                    ...formValue,
                    noOfPeople:noOfPeople,
                    totalCost:totalCost

                }
            })
        }
        

    }

    componentDidMount(){
        
        console.log(this.props.location.state.data);
        var data = this.props.location.state.data;
        if(data != null){
            var totalCost = parseInt(parseInt(data.chargePerPerson) * (1 - parseFloat(data.discount)/100))
            this.setState({
                noOfNights:data.noOfNights,
                chargePerPerson:data.chargePerPerson,
                destinationName:data.destinationName,
                discount:data.discount,
                costBedoreDiscount:data.chargePerPerson,
                formValue:{
                    noOfPeople:"1",
                    totalCost:totalCost.toString(),
                    userDTO:{userId:sessionStorage.getItem("userId")},
                    destinationDTO:{destinationId:data.destinationId}
                }
            })
        }
        
    }

    createDateToString = (dateObj) => {
        let month = dateObj.getMonth()+1;
        if(month < 10) month = "0" + month;
        const day = String(dateObj.getDate() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = year  + '-'+ month  + '-' + day;
        return output;
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});
        var url = backendUrlBooking + formValue.userDTO.userId;
        axios.post(url,formValue)
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

        if(sessionStorage.getItem("userId") == null){
            return(
                <div class="alert alert-primary" role="alert">
                    You have to login to use this functionality<a href = "/login" className = "alert=link"> Click here tho Log in</a>
                </div>
            )
        }
        
        const dateObj = new Date();
        const output = this.createDateToString(dateObj);

        console.log(output);
        return(
            <div id="booking" class="section">
    <div class="section-center">
        <div class="container">
            <div class="row">
                <div class="col-md-7 col-md-push-5">
                    <div class="booking-cta">
                        <h1>Make your reservation</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facere, soluta magnam consectetur molestias itaque
                            ad sint fugit architecto incidunt iste culpa perspiciatis possimus voluptates aliquid consequuntur cumque quasi.
                            Perspiciatis.
                        </p>
                    </div>
                </div>
                <div class="col-md-4 col-md-pull-7">
                    <div class="booking-form">
                        <div className = "row">
                            <div className = "col-sm-12">
                            <h5 class="form-label" style = {{color:"#808080"}}>{this.state.destinationName}</h5>
                            <h6 class="form-label" style = {{color:"#AEAEAE", marginBottom:20}}>{this.state.noOfNights} Nights</h6>
                            </div>
                        </div>
                        <form>
                        
                            <div className = "row">
                                <div className = "col-sm-3">
                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <span class="form-label">Check In</span>
                                        <input class="form-control" type="date" name = "checkIn" min={output} required onChange = {this.handlechange}/>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <span class="form-label">Check Out</span>
                                        <input class="form-control" type="date" name = "checkOut" min={output} value = {this.state.formValue.checkOut} disabled  required/>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="row">
                               
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <span class="form-label">No. of persons</span>
                                        <select class="form-control" name = "noOfPeoples" onChange = {this.handlechange}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                        <span class="select-arrow"></span>
                                    </div>
                                </div>
                                <div>
                                {(this.state.discount > 0)?
                                   <> <span class="form-label">Cost Before Discount:</span><span className = "font-weight-bold" style = {{"font-size": 15, color:"#808080"}} > ${this.state.costBedoreDiscount}/-</span><br></br>
                                        <span className = "font-weight-bold form-label text-success" style = {{"font-size": 15}} >Discount : {this.state.discount}%</span><br></br>
                                    
                                   </>:<></>
                                }   
                                <span class="form-label">Total cost to be paid:</span><span className = "font-weight-bold text-primary" style = {{"font-size": 25}} > ${this.state.formValue.totalCost}/-</span>
                                
                                </div>
                                
                            </div>
                            <div class="form-btn">
                                <button class="submit-btn" disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Book Tour</button>
                                
                            </div>

                        </form>
                        <br></br>
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
        )
    }

}

export default Booking;