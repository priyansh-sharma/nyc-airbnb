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
      listings : [],
      nonefound: false,
      n: ['East Village', 'Park Slope', 'South Slope', 'Upper East Side', 'Washington Heights', 'Woodside', 'Middle Village', 'Elmhurst', 'Nolita', 'Red Hook', 'Maspeth', 'North Riverdale', 'Bayswater', 'Fieldston', 'Fresh Meadows', 'Mariners Harbor', 'South Ozone Park', 'Pelham Bay', 'Edgemere', 'Richmondtown', 'Hollis', 'Olinville', 'Oakwood', 'South Beach', 'Castle Hill', 'Baychester', 'Edenwald', 'Ditmars Steinway', 'Cobble Hill', 'Ridgewood', 'Little Italy', 'Kensington', 'Eastchester', 'Carroll Gardens', 'Gowanus', 'Financial District', 'Jamaica', 'Concourse', 'Rockaway Beach', 'Allerton', 'Theater District', 'St.Albans', 'Arrochar', 'Wakefield', 'Morris Heights', 'Port Morris', 'Mount Eden', 'Woodrow', 'Parkchester', 'Whitestone', 'Kew Gardens', 'Grymes Hill', 'Howland Hook', 'Willowbrook', 'West Village', 'Greenpoint', 'Windsor Terrace', 'Inwood', 'Flatlands', 'Gramercy', 'Forest Hills', 'Cypress Hills', 'Clifton', 'Cambria Heights', 'Richmond Hill', 'Midwood', 'Bellerose', 'Borough Park', 'Riverdale', 'Navy Yard', 'Van Nest', 'College Point', 'Belmont', 'Bergen Beach', 'Douglaston', 'Bay Terrace', 'Staten Island', 'Westchester Square', 'Little Neck', 'New Brighton', 'Williamsburg', 'East Harlem', 'Tompkinsville', 'Brooklyn Heights', 'Boerum Hill', 'DUMBO', 'Highbridge', 'Tribeca', 'Kingsbridge', 'University Heights', 'Gravesend', 'Briarwood', 'Bay Ridge', 'Longwood', 'Glendale', 'Co-op City', 'Norwood', 'Lighthouse Hill', 'Morrisania', 'Midland Beach', 'Huguenot', 'Coney Island', 'Neponsit', 'Breezy Point', 'NoHo', 'Lower East Side', 'SoHo', 'Chelsea', 'Bushwick', 'Astoria', 'Crown Heights', 'Prospect Heights', 'Woodlawn', 'Mott Haven', 'Port Richmond', 'Woodhaven', 'Dyker Heights', 'Bronxdale', 'Kew Gardens Hills', 'Bay Terrace', 'Concord', 'Howard Beach', 'Bayside', 'West Brighton', 'Laurelton', 'East Morrisania', 'Hunts Point', 'Pelham Gardens', 'Rosedale', 'Melrose', 'Bath Beach', 'Mill Basin', 'Arden Heights', 'Harlem', 'Clinton Hill', 'Kips Bay', 'Sunnyside', 'Shore Acres', 'Brighton Beach', 'Concourse Village', 'Stapleton', 'Ozone Park', 'Columbia St', 'Canarsie', 'City Island', 'Stuyvesant Town', 'Sea Gate', 'Jamaica Estates', 'Tremont', 'Dongan Hills', 'Fort Wadsworth', 'Rosebank', 'West Farms', 'Bedford-Stuyvesant', 'Fort Greene', 'Flatiron District', 'Roosevelt Island', 'Midtown', 'Greenwich Village', 'Upper West Side', 'East Flatbush', 'Clason Point', 'Long Island City', 'Morningside Heights', 'Bensonhurst', 'Two Bridges', 'Sheepshead Bay', 'Emerson Hill', 'Spuyten Duyvil', 'Vinegar Hill', 'Jackson Heights', 'East Elmhurst', 'Downtown Brooklyn', 'Williamsbridge', 'Fordham', 'Mount Hope', 'Belle Harbor', 'Castleton Corners', 'Manhattan Beach', 'Marble Hill', 'New Dorp Beach', 'Schuylerville', 'Westerleigh', 'Grant City', 'Throgs Neck', 'Unionport', 'Chinatown', 'Murray Hill', 'Flatbush', 'Prospect-Lefferts Gardens', 'Flushing', 'St. George', 'Sunset Park', 'Queens Village', 'East New York', 'Fort Hamilton', 'Graniteville', 'Rego Park', 'Battery Park City', 'Civic Center', 'New Springville', 'Arverne', 'Soundview', 'Claremont Village', 'Brownsville', 'Springfield Gardens', 'Morris Park', 'Corona', 'Randall Manor', 'Great Kills', 'Far Rockaway', 'Holliswood', 'Tottenville', 'Eltingville', 'Jamaica Hills', 'Silver Lake', 'Todt Hill']

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
        if (airbnbsList.rows.length == 0) {
          this.setState({
            nonefound: true
          });
        } else {
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
            nonefound: false,
            listings : airbnbCards
          });
        }
      
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
                  {(this.state.borough == '...' || this.state.borough == '') ? <a className="error" style={{ color: "red" }}>Please enter a borough.</a> : <a></a>}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNeighborhood">
                <Form.Label>Neighborhood</Form.Label>
                <Form.Control 
                name="neighborhood" 
                onChange={this.handleFilterChange} required>
                </Form.Control>
                {(this.state.neighborhood == '...' || !this.state.n.includes(this.state.neighborhood)) ? <a className="error" style={{ color: "red" }}>Please enter a neighborhood.</a> : <a></a>}
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
                  {(this.state.room_type == '...' || this.state.room_type == '') ? <a className="error" style={{ color: "red" }}>Please enter a room preference.</a> : <a></a>}
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
              style={{ height: "40px", float: "right"}}
              onClick={this.submitFilter}
              >Submit Filter</Button>
          </div>
          <div className="cards-container">
          <Container> 
            {(this.state.nonefound) ? <a className="error" style={{color: "gray"}}>No listings found. Try another search.</a> : <a></a>}  
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