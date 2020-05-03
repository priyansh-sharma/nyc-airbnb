import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../style/Welcome.css';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

		this.state = {
			username: "",
			password: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.submitCredentials = this.submitCredentials.bind(this);
  }

  submitCredentials() {
    let credentials = {username : this.state.username, password : this.state.password};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    };
    console.log("request made");
    fetch('http://localhost:8081/login', requestOptions)
    .then(res => {
      if (res.ok) {
        this.setState({redirect: true});
      } else {
        alert("Check your credentials");
      }
    }, err => {
      console.log(err);
    });
  }

  handleChange(e) {
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
            onSubmit={this.submitCredentials}>
              <img className="logo" src={require('../style/NoisYC.png')} alt="Logo"></img>
                
              <p className="appdescription"> Find some peace and quiet in the city that never sleeps.
                </p>

              <div className="field-input">
                <input 
                className="input" 
                type="text" 
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                ></input>
                <span className="input-focus" placeholder="Username"></span>
              </div>

              <div className="field-input">
                <input 
                className="input" 
                type="password" 
                name="password"
                value={this.state.password}
                onChange={this.handleChange}></input>
                <span className="input-focus" placeholder="Password"></span>
              </div>
            </form>
              <div className="login-btn-container">
                <div className="login-btn-wrap">
                  <button className="login-btn"
                  onClick={this.submitCredentials}>
                    Login
                  </button>
                </div>
              </div>

              <div className="page-break">
                <span className="no-account">
                  Don’t have an account?
                </span>

                <a className="signup" href="/signup">
                  Sign Up
                </a>
              </div>

            
            
          </div>
        </div>
      </div> 
    )
  }
}

