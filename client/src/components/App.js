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
import BarsAndParties from './BarsAndParties';
import Map from './Map';

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
              path="/barsandparties"
              render={() => (<BarsAndParties />)}
            />
            <Route
              path="/map"
              render={() => (<Map />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;