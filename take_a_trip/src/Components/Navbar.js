import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import SearchPackages from "./SearcPackages";
import Hotdeals from "./Hotdeals";
import Booking from "./Booking";
import ViewBookings from "./ViewBooking";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          logged_userId: sessionStorage.getItem("userId"),
          logged_userName: sessionStorage.getItem("userName"),
          dialog_visible: false,
          logged_out: false
        };
      }
    
      onClick = () => {
        this.setState({ dialog_visible: true });
      };
    
      onHide = () => {
        this.setState({ dialog_visible: false });
      };
    
      logout = () => {
        this.setState({ dialog_visible: false });
        sessionStorage.clear();
        this.setState({ logged_out: true });
        window.location.reload();
      };
    
      confirm_logout = () => {
        this.setState({ dialog_visible: true });
      };
    render(){
        return(
            <div>
                <Router>

                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                        <div className = "navbar-header">
                                <Link className="navbar-brand" to="/">
                                    Start Exploring
                                </Link>
                            </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav mr-auto">
                                {this.state.logged_userId ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                    Welcome {this.state.logged_userName}
                                    </Link>
                                </li>
                                ) : null}
                                <li className="nav-item">
                                <Link className="nav-link" to="/packages">
                                    Hot Deals{" "}
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/viewBookings">
                                    Planned Trips
                                </Link>
                                </li>

                                {!this.state.logged_userId ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                    {" "}
                                    Login
                                    </Link>
                                </li>
                                ) : null}
                                {this.state.logged_userId ? (
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={this.logout} to="">
                                    {" "}
                                    Logout
                                    </Link>
                                </li>
                                ) : null}
                            
                            </div>
                        </div>
                    </nav>

                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/login" component= {Login}></Route>
                        <Route exact path="/register" component={Register}></Route>
                        
                        <Route exact path="/packages/:continent" component={SearchPackages}></Route>
                        <Route exact path="/packages" component = {Hotdeals}></Route>
                        <Route exact path = "/booking" render = {(props) => <Booking {...props}/>}></Route>
                        <Route exact path = "/viewBookings" component = {ViewBookings}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default Navbar;