import React, { useState, useEffect, Component } from 'react';
import ListingCard from './ListingCard';
import {Button, CardDeck, Container, Row, Col} from 'react-bootstrap';


function ToggleButton() {
  const [isClicked, setClicked] = useState(false);

  return (
    <Button
      variant="primary"
      onClick={() => setClicked(!isClicked)}
    >
      {isClicked ? 'lots of bars' : 'no bars'}
    </Button>
  );
}

export default class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airbnbs: [],
      bars: false
    }
  }

  async componentDidMount() {
      let url;
      console.log("beginning" + this.state.bars)
      if (this.state.bars){
        url = "http://localhost:8081/manybars"
      } else {
        url = "http://localhost:8081/fewbars"
      }
      await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          borough: "Brooklyn",
          neighborhood: "Kensington",
          room_type: "Private room",
          min_price: 50,
          max_price: 1000,
          radius: 0.5
        })
      }).then((res) => res.json())
      .then((bnbList) => {
        console.log(bnbList)
        let airbnbCards = bnbList.rows.map(
          (x => <ListingCard
            key = {x.ID}
            num_bars = {x.BAR_COUNT}
            name={x.NAME} borough={x.NEIGHBOURHOOD_GROUP} 
            lat = {x.LATITUDE} long = {x.LONGITUDE} 
            host = {x.HOST_NAME} room_type = {x.ROOM_TYPE} price = {x.PRICE}/>)
        )

          this.setState({
            airbnbs: airbnbCards
          });
      })
    }

    render () {
      console.log("end" + this.state.bars)
      return (
        <Container> 
          <Row>
            <Col md="auto"><h1 class="display-2">I want my Airbnb to be near</h1></Col>
            <div class="col mt-5" onClick={()=> {
              this.setState(
                {bars: !this.state.bars}, () => {this.componentDidMount()})}}><ToggleButton/></div>
          </Row>
          <CardDeck>
          {this.state.airbnbs}
          </CardDeck>
        </Container>
      )
    }
}


