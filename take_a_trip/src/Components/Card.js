import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Modal,Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../custom.css";


class CreateCard extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            package : null,
            buttonActive:false,
            showModal:false,
            redirectBooking:false,
        }
    }

    handleClose = () => {this.setState({showModal:false})}
    hanfleShow = () => {this.setState({showModal:true})}

    componentWillMount(){
        this.setState({package : this.props.package});
        if(this.props.package.availability <= 0){
            this.setState({buttonActive:true});
        }
    }

    addDataModal(){
        this.hanfleShow();
    }

    handleBooking = () =>{
        this.setState({redirectBooking : true});
        console.log("Book");
    }

    render(){

        var item = this.state.package;
        var discount = null;

        if(item){

            if(this.state.redirectBooking === true) return <Redirect to = {{pathname : "/booking", state : {data:item}}}></Redirect>

            var packageInclusion = item.detailsDTO.packageInclusion.split(",");
            var highlights = item.detailsDTO.highlights.split(",");

            if(item.availability <= 0){
                var discount = <h5 class="badge badge-pill badge-danger">Not Available at a Moment.</h5>
            }
            else{
                var discount = <h5 class="badge badge-pill badge-primary" style = {{backgroundColor : "#2e7eff"}}>Instant Discount: {item.discount}</h5>
            }

            return(
                <>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <div class="card">
                                    <div class="card-horizontal">
                                        <div class="img-square-wrapper">
                                            <img class="package-image" src={item.imageUrl} alt="Card image cap"/>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">{item.destinationName}</h4>
                                            <p class="card-text text-justify">{item.detailsDTO.about}</p>
                                            <h4 className = "font-weight-bold text-primary">${item.chargePerPerson}</h4>
                                            <h5>{discount}</h5>
                                            <button type = "button" className = "btn btn-primary float-right" onClick = {() => this.addDataModal()}>View Details</button>
                                            <button type = "button" className = "btn btn-success float-right" style={{marginLeft: 10}} disabled= {this.state.buttonActive} onClick = {this.handleBooking}>Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <Modal show = {this.state.showModal} onHide = {this.handleClose} size = "lg" animationType = {"fade"}>
                        <Modal.Header closeButton>
                            <Modal.Title>{item.destinationName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>HIGHLIGHTS</h5>
                            <hr></hr>
                            <ul style = {{"list-style-type":"disc"}}>
                                {
                                    highlights.map((inclusion) => <li className = "font-italic">{inclusion}</li>)
                                }
                            </ul>
                            <hr></hr>

                            <h5>PACKAGE INCLUSION</h5>
                            <hr></hr>
                            <ul style = {{"list-style-type":"disc"}}>
                                {
                                    packageInclusion.map((inclusion) => <li className = "font-italic">{inclusion}</li>)
                                }
                            </ul>

                        </Modal.Body>
                        <Modal.Footer>
                            <h5>{discount}</h5>
                            <Button variant= "secondary" onClick = {this.handleClose}>close</Button>
                            <button type = "button" className = "btn btn-success float-right" style={{marginLeft: 10}} disabled= {this.state.buttonActive} onClick = {this.handleBooking}>Book</button>
                        </Modal.Footer>

                    </Modal>
                </>                
            )

        }else{
            return(
            <>Please Wait...</>
            )
        }
    }
    
}

export default CreateCard;