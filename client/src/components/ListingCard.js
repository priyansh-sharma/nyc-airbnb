import React, { Component } from 'react';
import {
  Card, ListGroup, ListGroupItem
} from 'react-bootstrap';

class ListingCard extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
        <Card>
            <Card.Body>
              <Card.Title>{this.props.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.props.borough}, NY</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{this.props.num_bars} bars nearby</ListGroupItem>
                <ListGroupItem>{this.props.room_type}</ListGroupItem>
                <ListGroupItem>${this.props.price}</ListGroupItem>
                <ListGroupItem>Hosted by {this.props.host}</ListGroupItem>
            </ListGroup>
            <Card.Footer>
                <small className="text-muted">{this.props.lat}, {this.props.long}</small>
            </Card.Footer>
        </Card>
        );
    }
}

export default ListingCard;