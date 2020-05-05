import React, { useState, useEffect, Component } from 'react';
import ListingCard from './ListingCard';
import NavBar from './NavBar';
import {Button, CardDeck, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import {
  withRouter, useLocation, Redirect
} from "react-router";

function ToggleButton() {
  const [isClicked, setClicked] = useState(false);

  return (
    <Button
      variant="primary"
      onClick={() => setClicked(!isClicked)}
    >
      {isClicked ? 'near the action' : 'away from the action'}
    </Button>
  );
}

class BarsAndParties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airbnbs: [],
      noise: false,
      distance: 2000,
      unit: "feet",
      nonefound: false
    }
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let radius = (this.state.unit === "feet" ? this.state.distance / 5280 : this.state.distance);
      let url;
      console.log("beginning" + this.state.noise)
      if (this.state.noise){
        url = "http://localhost:8081/manybarsandparties";
      } else {
        url = "http://localhost:8081/fewbarsandparties";
      }
      
      let bnbFields = this.props.location.state;

      if(bnbFields) {
        bnbFields.radius = radius;
        console.log(bnbFields);
        await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bnbFields)
        }).then(
          (res) => res.json())
        .then((bnbList) => {
          console.log(bnbList);
          if (bnbList.rows.length == 0) {
            this.setState({
              nonefound: true
            });
          } else {
            let airbnbCards = bnbList.rows.map(
            (x => <ListingCard
              key = {x.ID}
              is_bar_page = {true}
              num_bars = {x.BAR_COUNT}
              num_parties = {x.PARTY_COUNT}
              name={x.NAME} borough={x.NEIGHBOURHOOD_GROUP} 
              lat = {x.LATITUDE} long = {x.LONGITUDE} 
              host = {x.HOST_NAME} room_type = {x.ROOM_TYPE} price = {x.PRICE}/>)
          )
            this.setState({
              airbnbs: airbnbCards,
              nonefound: false
            });
          }
          
        })
      }
    }

    handleChange(e) {
      e.preventDefault();
      let target = e.target;
      this.setState({
        [target.name]: target.value
      });
      console.log(target.value);
    }

    nextPage() {
      this.setState({redirect: true});
    }

    render () {
      let toPass = this.state.airbnbs;
      if (this.state.redirect) {
        return <Redirect to={{
          pathname: '/map',
          state: JSON.stringify(toPass)
        }}/>;
      }
      return (
        <div>
          <NavBar/>
          <Container fluid>

          <h1 class="display-4">
            <div class="row justify-content-md-center">
              <div class="mr-2">I want my Airbnb to be</div>
              <div class="ml-2"><div onClick={()=> {
                this.setState(
                  {noise: !this.state.noise})}}><ToggleButton/></div></div>
            </div>
          </h1>
          <Row className="justify-content-md-center">
            <Col sm="2">
                <InputGroup.Text id="basic-addon1">find noise within: </InputGroup.Text>
                </Col>
                <Col sm="2">
                <FormControl 
                  placeholder="2000"
                  name="distance"
                  onChange={this.handleChange}
                />
                </Col>
                <Col sm="1">
                <Form.Control 
                name="room_type" 
                as={InputGroup.Append} 
                as="select"
                onChange={this.handleChange} required>
                  <option value="feet">feet</option>
                  <option value="miles">miles</option>
                </Form.Control>
                </Col>
            </Row>
            <Row><div>

              </div></Row>
            <Row className="justify-content-md-center"> 
            <Button className="mt-3 mb-3"
              variant="outline-primary"
              style={{height: "40px", float: "right"}}
              onClick={() => {this.componentDidMount()}}
              >I'm ready for my results!</Button>
            </Row>
          </Container>

          <div className="cards-container2">
          <Container> 
          {(this.state.nonefound) ? <a className="error" style={{color: "gray"}}>No listings found. Try another search.</a> : <a></a>}
            {this.state.airbnbs}
          </Container>
          </div>


          <div className="footer">
            <Button
              variant="outline-secondary"
              style= {{marginLeft: "10px", float: "left", marginTop: "9px"}}
              href='/airbnbs'
              >Back</Button>
            <Button 
              variant="outline-secondary"
              style= {{marginRight: "10px", float: "right", marginTop: "9px"}}
              onClick={this.nextPage}
              >Check out the map</Button>
          </div>
        </div>
        
      )
    }
}

export default withRouter(BarsAndParties)


