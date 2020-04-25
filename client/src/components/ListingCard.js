import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class ListingCard extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div>
            <Card>
                <CardBody>
                    <CardTitle>{this.props.id}</CardTitle>
                    <CardSubtitle>{this.props.name}</CardSubtitle>
                    <CardText>Lorem Ipsum</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }
}

export default ListingCard;