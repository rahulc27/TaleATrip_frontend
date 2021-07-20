import React, { Component } from "react";
import {backendUrlGetBooking} from '../BckendURL';
import axios from 'axios';
import "../booking.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class ViewBookings extends Component{
    
    constructor(){
        super()
        this.state={
            bookings : [],
            errorMessage : "",
            successMessage : ""
        }
    }

    componentWillMount(){
        this.fetchBookings();
    }

    fetchBookings = () => {
        this.setState({errorMessage:"", successMessage:""});

        axios.get(backendUrlGetBooking + sessionStorage.getItem("userId"))
        .then(
            response => {
                console.log(response.data)
                this.setState({bookings : response.data});
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
        console.log("hello")
        console.log(this.state.bookings);
        var bookings = this.state.bookings;
        if(bookings.length > 0){
            return(
                
                <div className = "masrhead book-page">
                    {
                        bookings.map(item => (
                            <div class="container-fluid">
                                <div class="row" style = {{justifyContent : "center"}}>
                                    <div class="col-9 mt-3" style = {{justifyContent : "center"}}>
                                        <div class="card">
                                            <div class="card-header">
                                                    Booking Id: {item.bookingId}
                                            </div>
                                            <div class="card-horizontal">
                                            
                                                <div class="img-square-wrapper">
                                                    <img class="package-image" src={item.destinationDTO.imageUrl} style= {{margin : 10, border:1}} alt="Card image cap"/>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">{item.destinationDTO.destinationName}</h4>
                                                    <div class="card-text">
                                                        <p>No. of people: {item.noOfPeople}</p>
                                                        <p style={{marginTop : -15}}>Check In: {item.checkIn}</p>
                                                        <p style={{marginTop : -15}}>Check Out: {item.checkOut}</p>
                                                    </div>
                                                    <h4 className = "font-weight-bold text-primary" style={{marginTop : 30}}>${item.totalCost}/-</h4>
                                                    
                                                </div>
                                                
                                            </div>
                                            <div class="card-footer text-muted">
                                                    Booked at : {item.timeOfBooking}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            )
            
        }

        return(
            <div class="alert alert-primary" role="alert">
                No bookings found for your account<a href = "/" className = "alert=link">Click here tho search tour</a>
            </div>
        )
        
    }
}

export default ViewBookings;