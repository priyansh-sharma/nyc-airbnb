import React, { Component } from 'react';
import NavBar from './NavBar';
import ListingCard from './ListingCard';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {
  withRouter, useLocation, Redirect
} from "react-router";
import {Button, CardDeck, Container, Row, Col, Form} from 'react-bootstrap';
import '../style/Page.css';

export class MapPage extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      airbnbs: [],
      markers: [],
      activeName: ""
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  
  componentDidMount() {
    
    // console.log(bnbs);
    if (this.props.location.state) {
      let bnbs = JSON.parse(this.props.location.state);
      let airbnbCards = bnbs.map((listing, i) => 
        <ListingCard
            key = {listing.key}
            is_bar_page = {true}
            num_bars = {listing.props.num_bars}
            num_parties = {listing.props.num_parties}
            name={listing.props.name}
            borough={listing.props.borough}
            host = {listing.props.host} 
            room_type = {listing.props.room_type}
            price = {listing.props.price}
            className = {this.state.activeName === listing.props.name ? "active" : ""}/>)

        this.setState({
          airbnbs: airbnbCards
        });

        let markerObjs = bnbs.map((x, i) => 
        <Marker
            key = {x.key}
            name = {x.props.name}
            ref={this.myRef}
            position = {{lat: x.props.lat, lng: x.props.long}}
            onClick = {this.onMarkerClick}
          />);

        this.setState({
          markers: markerObjs
        });
    }
  }

  onMarkerClick(e) {
    console.log(this.myRef.current);
    e.map.setZoom(15);
    e.map.setCenter(e.position);
    console.log(e.name);
    this.setState({
      activeName: e.name
    });
  }

  render() {
    return(
      <div style={{height:"100%"}}>
        <NavBar/>
        <div >
          <div className="listings-container">
              {this.state.airbnbs}
          </div>
          
          <div className="map-container">
          <Map google={this.props.google} 
          zoom={12}
          style={{width: "60%", height: "92%"}}
          initialCenter={{
            lat: 40.7128,
            lng: -74
          }}
          containerStyle={{position: "fixed", left: "40%", right: "0"}}>

          {this.state.markers}

          </Map>
          
          </div>
        </div>
      </div> 
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDBxSoHtNvTlVw8zuEFc6uOxAdrsAxo9fY")
})(withRouter(MapPage))

