import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import '../style/App.css';
import Welcome from './Welcome';
import Signup from './Signup';
import Airbnb from './Airbnb';
import Bar from './Bar';
import Party from './Party';

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
              path="/signup"
              render={() => (<Signup />)}
            />
            <Route
              exact
              path="/airbnbs"
              render={() => (<Airbnb />)}
            />
            <Route
              path="/bars"
              render={() => (<Bar />)}
            />
            <Route
              path="/parties"
              render={() => (<Party />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
