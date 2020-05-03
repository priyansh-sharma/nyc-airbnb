import React, { Component } from 'react';
import NavBar from './NavBar';
import ListingCard from './ListingCard';
import {
  Form, Col, Button
} from 'react-bootstrap';
import '../style/Page.css';

export default class Airbnb extends Component {
constructor (props) {
    super(props);

    this.state = {
        
      borough : "...",
      room_type: "...",
      neighborhood: "...",
      min_price: 0,
      max_price: 0,
      listings : []
    }

  this.handleFilterChange = this.handleFilterChange.bind(this);
  this.submitFilter = this.submitFilter.bind(this);
}

handleFilterChange(e) {
	e.preventDefault();
  let target = e.target;
  this.setState({
    [target.name]: target.value
  });
  console.log(target.value);
}

submitFilter() {
  let filter = {
    borough : this.state.borough, 
    room_type : this.state.room_type,
    neighborhood: this.state.neighborhood,
    min_price: this.state.min_price,
    max_price: this.state.max_price
  };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    };
  fetch("http://localhost:8081/airbnb", requestOptions)
  .then(res => {
		return res.json();
	}, err => {
		console.log(err);
	}).then(airbnbsList => {
        let airbnbCards = airbnbsList.map((airbnb, i) => 
        <ListingCard 
        name={airbnb.name}
        borough={airbnb.borough}
        room_type={airbnb.room_type}
        price={airbnb.price}
        host={airbnb.host}
        lat={airbnb.lat}
        long={airbnb.long}
        />);

        this.setState({
            listings : airbnbCards
        });
    }, err => {
        console.log(err);
    });
}

render() {
  return(
    <div>
      <NavBar/>
      <div style={{width: "100%"}}>
          <div className="results-form-container">
          <div className="form-container">
            <form className="bnb-form">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridBorough">
                <Form.Label>Borough</Form.Label>
                <Form.Control 
                as="select" 
                name="borough"
                onChange={this.handleFilterChange}>
                  <option > </option>
                  <option value="Bronx">Bronx</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Queens">Queens</option>
                  <option value="Staten Island">Staten Island</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRoomType">
                <Form.Label>Room Type</Form.Label>
                <Form.Control 
                name="room_type" 
                as="select" 
                onChange={this.handleFilterChange}>
                  <option > </option>
                  <option value="Private room">Private room</option>
                  <option value="Shared room">Shared room</option>
                  <option value="Entire home/apt">Entire home/apt</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNeighborhood">
                <Form.Label>Neighborhood</Form.Label>
                <Form.Control 
                name="neighborhood" 
                onChange={this.handleFilterChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="1"  controlId="pricemin">
              <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Min" required />
              </Form.Group>
              <a style={{marginTop: "33px"}}>_</a>
              <Form.Group as={Col} md="1" style={{marginTop: "33px"}} controlId="pricemin">
                <Form.Control type="number" placeholder="Max" required />
              </Form.Group>
            </Form.Row>
            <Button 
            variant="outline-primary"
            style={{height: "75%", float: "right", marginRight: "70px"}}
            onClick={this.submitFilter}
            >Submit Filter</Button>
            </form>
          </div>
          <div className="cards-container">
            {this.state.listings}
          </div>
        </div>
        <div className="maps-container"></div>
      </div>
      
      
    </div> 
  )
  }
}
