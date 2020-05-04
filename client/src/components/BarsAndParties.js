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
      {isClicked ? 'lots of bars and parties' : 'no bars and parties'}
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
      unit: "feet"
    }
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let radius = (this.state.unit === "feet" ? this.state.distance / 5280 : this.state.distance);
      // console.log(radius);
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
          console.log(bnbList)
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
              airbnbs: airbnbCards
            });
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

    // async submitFilter() {
    //   const MILES_ONE_DEGREE = 69;
    // let radius;
    //   if (this.state.unit === "feet") {
    //     radius = (this.state.distance / 5280) / MILES_ONE_DEGREE;
    //   } else {
    //     radius = (this.state.distance) / MILES_ONE_DEGREE;
    //   }
    //   let url;
    //   console.log("beginning" + this.state.noise)
    //   if (this.state.noise){
    //     url = "http://localhost:8081/manybarsandparties";
    //   } else {
    //     url = "http://localhost:8081/fewbarsandparties";
    //   }
      
    //   let bnbFields = this.props.location.state;

    //   if(bnbFields) {
    //     bnbFields.radius = radius;
    //     await fetch(url,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(bnbFields)
    //     }).then(
    //       (res) => res.json())
    //     .then((bnbList) => {
    //       console.log(bnbList)
    //       let airbnbCards = bnbList.rows.map(
    //         (x => <ListingCard
    //           key = {x.ID}
    //           is_bar_page = {true}
    //           num_bars = {x.BAR_COUNT}
    //           num_parties = {x.PARTY_COUNT}
    //           name={x.NAME} borough={x.NEIGHBOURHOOD_GROUP} 
    //           lat = {x.LATITUDE} long = {x.LONGITUDE} 
    //           host = {x.HOST_NAME} room_type = {x.ROOM_TYPE} price = {x.PRICE}/>)
    //       )
  
    //         this.setState({
    //           airbnbs: airbnbCards
    //         });
    //     })
    //   }
    // }

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
          <div className = "form-container">
          
              <Col md="auto"><h3 style={{textAlign: "center"}}>I want my Airbnb to be near</h3></Col>
              <div className="col" onClick={()=> {
                this.setState(
                  {noise: !this.state.noise}, () => {this.componentDidMount()})}}><ToggleButton/></div>
              
              <InputGroup>
                <Form.Label>I care about noise within...</Form.Label>
                <FormControl
                  placeholder="2000"
                  md = "3"
                  name="distance"
                  onChange={this.handleChange}
                />

                {/* <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.unit}
                  name="unit"
                  onChange={this.handleChange}
                >
                  <Dropdown.Item value="feet">feet</Dropdown.Item>
                  <Dropdown.Item value="miles">miles</Dropdown.Item>
                </DropdownButton> */}

                <Form.Control 
                name="room_type" 
                as={InputGroup.Append} 
                as="select"
                onChange={this.handleChange} required>
                  <option value="feet">feet</option>
                  <option value="miles">miles</option>
                </Form.Control>
              </InputGroup>

              <Button
              variant="outline-primary"
              style={{height: "40px", float: "right"}}
              onClick={() => {this.componentDidMount()}}
              >Submit Filter</Button>
     
              
          </div>
          <div className="cards-container">
          <Container> 
            
            {this.state.airbnbs}
            
          </Container>
          </div>
          <div className="footer-container">
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


