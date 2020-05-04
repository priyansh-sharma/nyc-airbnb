import React, { Component } from 'react';
import NavBar from './NavBar';
import ListingCard from './ListingCard';
import { Redirect } from 'react-router';
import {
  Form, Col, Button, CardDeck, Container, Row
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
      max_price: 5000,
      listings : []
    }

  this.handleFilterChange = this.handleFilterChange.bind(this);
  this.submitFilter = this.submitFilter.bind(this);
  this.nextPage = this.nextPage.bind(this);
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
  console.log(JSON.stringify(filter));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    };
  fetch("http://localhost:8081/airbnb", requestOptions)
  .then(res => {
		return res.json()
	}, err => {
		console.log(err);
	}).then((airbnbsList) => {
        console.log(airbnbsList);
        if (!airbnbsList.rows) alert("No listings found");
        let airbnbCards = airbnbsList.rows.map((airbnb, i) => 
        <ListingCard 
        key = {airbnb.ID}
        name={airbnb.NAME}
        borough={airbnb.NEIGHBOURHOOD_GROUP}
        room_type={airbnb.ROOM_TYPE}
        price={airbnb.PRICE}
        host={airbnb.HOST_NAME}
        lat={airbnb.LATITUDE}
        long={airbnb.LONGITUDE}
        />);

        this.setState({
            listings : airbnbCards
        });
    }, err => {
        console.log(err);
    });
}

nextPage() {
  this.setState({redirect: true});
}

render() {
  if (this.state.redirect) {
    let bnbFields = {
      borough: this.state.borough,
      neighborhood: this.state.neighborhood,
      room_type: this.state.room_type,
      min_price: this.state.min_price,
      max_price: this.state.max_price
    }
    return <Redirect to={{
      pathname: '/barsandparties',
      state: bnbFields
    }}/>;
  }
  return(
    <div style={{height: "100%"}}>
      <NavBar/>
      <div style={{width: "100%"}}>
          <div className="results-form-container" style={{height: "100%"}}>
          <div className="form-container">
            <form className="bnb-form">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridBorough">
                <Form.Label>Borough</Form.Label>
                <Form.Control 
                as="select" 
                name="borough"
                onChange={this.handleFilterChange} required>
                  <option > </option>
                  <option value="Bronx">Bronx</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Queens">Queens</option>
                  <option value="Staten Island">Staten Island</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNeighborhood">
                <Form.Label>Neighborhood</Form.Label>
                <Form.Control 
                name="neighborhood" 
                onChange={this.handleFilterChange} required>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRoomType">
                <Form.Label>Room Type</Form.Label>
                <Form.Control 
                name="room_type" 
                as="select" 
                onChange={this.handleFilterChange} required>
                  <option > </option>
                  <option value="Private room">Private room</option>
                  <option value="Shared room">Shared room</option>
                  <option value="Entire home/apt">Entire home/apt</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="1"  controlId="pricemin">
              <Form.Label>Price</Form.Label>
                <Form.Control name="min_price" type="number" placeholder="Min" onChange={this.handleFilterChange} required />
              </Form.Group>
              <a style={{marginTop: "33px"}}>_</a>
              <Form.Group as={Col} md="1" style={{marginTop: "33px"}} controlId="pricemin">
                <Form.Control name="max_price" type="number" placeholder="Max" onChange={this.handleFilterChange} required />
              </Form.Group>
            </Form.Row>
            </form>
            <Button
              variant="outline-primary"
              style={{height: "40px", float: "right"}}
              onClick={this.submitFilter}
              >Submit Filter</Button>
          </div>
          <div className="cards-container">
          <Container> 
            
            {this.state.listings}
            
          </Container>
          </div>
        </div>
        <div className="footer-container">
          <Button 
            variant="outline-secondary"
            style= {{marginRight: "10px", float: "right", marginTop: "9px"}}
            onClick={this.nextPage}
            >Check out noise activity</Button>
        </div>
        
      </div>
      
      
    </div> 
  )
  }
}