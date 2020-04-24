import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (<Welcome />)}
            />
            <Route
              exact
              path="/bars"
              render={() =>                 <div className="App">
              <h1>Hello, React!</h1>
            </div>}
            />
            <Route
              path="/airbnb"
              render={() =>                 <div className="App">
              <h1>Hello, React!</h1>
            </div>}
            />
            <Route
              path="/parties"
              render={() =>                 <div className="App">
              <h1>Hello, React!</h1>
            </div>}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
