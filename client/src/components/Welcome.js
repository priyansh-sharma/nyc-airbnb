import React, { Component } from 'react';
import '../style/Welcome.css';
// import '../style/NoisYC.png';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

		this.state = {
			username: "",
			password: ""
		};
  }

  submitCredentials() {
    let username = this.state.username;
    let password = this.state.password;


  }
  
  // componentDidMount() {
  //   // Send an HTTP request to the server.
  //   fetch("http://localhost:8081/connection",
  //   {
  //     method: 'GET' // The type of HTTP request.
  //   }).then(res => {
  //     // Convert the response data to a JSON.
  //     return res.text();
  //   }, err => {
  //     // Print the error if there is one.
  //     console.log(err);
  //   }).then(res => console.log(res))
  // }

  render() {
    return(
      <div>
        <div className="login-container">
          <div className="login-panel">
            <form className="login-form">
              <img className="logo" src={require('../style/NoisYC.png')} alt="Logo"></img>
                
              <p class="appdescription"> Find some peace and quiet in the city that never sleeps.
                </p>

              <div class="field-input">
                <input class="input" type="text" name="username"></input>
                <span class="input-focus" placeholder="Username"></span>
              </div>

              <div class="field-input">
                <input class="input" type="password" name="password"></input>
                <span class="input-focus" placeholder="Password"></span>
              </div>

              <div class="login-btn-container">
                <div class="login-btn-wrap">
                  <button class="login-btn">
                    Login
                  </button>
                </div>
              </div>

              <div class="page-break">
                <span class="no-account">
                  Don’t have an account?
                </span>

                <a class="signup" href="/signup">
                  Sign Up
                </a>
              </div>

            </form>
            
          </div>
        </div>
      </div> 
    )
  }
}

