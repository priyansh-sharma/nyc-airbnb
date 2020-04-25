import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Welcome extends Component {
  
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/connection",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.text();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(res => console.log(res))
  }
  render() {
    return(
      <div>
        <NavBar/>
        <h1>Welcome to NoisYC!</h1>
      </div> 
    )
  }
}

