import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import '../style/Welcome.css';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

		this.state = {
			username: "",
      password: "",
      error: false
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
        this.setState({error: true});
        console.log("yeet");
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
              <Form>

                <Form.Group>
                {(this.state.error) ? <a className="error" style={{color: "orangered"}}>Check your credentials and try again</a> : <a></a>}
                  <Form.Control 
                  type="text" 
                  className="boot-input"
                  name="username" 
                  placeholder="Username" 
                  value={this.state.username}
                  onChange={this.handleChange}
                  style={{marginTop: "20px", backgroundColor: "#dcdcdc2b"}}
                />
                </Form.Group>

                <Form.Group>
                  <Form.Control 
                  type="password" 
                  className="boot-input"
                  name="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={this.handleChange}
                  style={{marginTop: "-8px", marginBottom: "10px", backgroundColor: "#dcdcdc2b"}}
                />
                </Form.Group>
              </Form>
                

              {/* <div className="field-input"
              style= {{marginTop: "20px"}}>
                <input 
                className="input" 
                type="text" 
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                ></input>
                <span className="input-focus" placeholder="Username"></span>
              </div>

              <div className="field-input"
              style= {{marginBottom: "20px"}}>
                <input 
                className="input" 
                type="password" 
                name="password"
                value={this.state.password}
                onChange={this.handleChange}></input>
                <span className="input-focus" placeholder="Password"></span>
              </div> */}
            </form>
            
            <div className="login-btn-container">
                <div className="login-btn-wrap">
                <Button variant="primary"
                style = {{width: "100%"}}
                onClick={this.submitCredentials}
                >Login</Button>
                </div>
              </div>

              {/* <div className="login-btn-container">
                <div className="login-btn-wrap">
                  <button className="login-btn"
                  onClick={this.submitCredentials}>
                    Login
                  </button>
                </div>
              </div> */}

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

