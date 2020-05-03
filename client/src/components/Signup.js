import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../style/Welcome.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.submitNewCredentials = this.submitNewCredentials.bind(this);
  }

  submitNewCredentials() {
    let credentials = {username : this.state.username, password : this.state.password};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    };
    console.log(requestOptions.body);
    fetch('http://localhost:8081/signup', requestOptions)
      .then(res => {
        res.json();
        if (res.ok) {
          this.setState({redirect: true});
        } else {
          alert("Check your info");
        }
    }, err => {
      console.log(err);
    });
  }

  handleChange(e) {
    e.preventDefault();
    let target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/airbnbs" />;
    }
    return(
    <div>
        <div className="login-container">
        <div className="login-panel">
            <form className="login-form"
            onSubmit={this.submitNewCredentials}>
            <img className="logo" src={require('../style/NoisYC.png')} alt="Logo"></img>
                
            <p className="appdescription"> Make an account to start browsing!
                </p>

            <div className="field-input">
              <input 
              className="input" 
              type="text" 
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              ></input>
              <span className="input-focus" placeholder="First name"></span>
            </div>

            <div className="field-input">
              <input 
              className="input" 
              type="text" 
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              ></input>
              <span className="input-focus" placeholder="Last name"></span>
            </div>

            <div className="field-input">
                <input 
                className="input" 
                type="text" 
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                ></input>
                <span className="input-focus" placeholder="New username"></span>
            </div>

            <div className="field-input">
                <input 
                className="input" 
                type="password" 
                name="password"
                value={this.state.password}
                onChange={this.handleChange}></input>
                <span className="input-focus" placeholder="New password"></span>
            </div>

          </form>

            <div className="login-btn-container">
                <div className="login-btn-wrap">
                <button className="login-btn"
                onClick={this.submitNewCredentials}>
                    Sign Up
                </button>
                </div>
            </div>

            <div className="page-break">
                <span className="no-account">
                Already have an account? Login
                </span>

                <a className="signup" href="/">
                Here
                </a>
            </div>

            
            
        </div>
        </div>
    </div> 
    )
  }
}

