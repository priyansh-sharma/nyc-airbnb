import React, { Component } from 'react';
import NavBar from './NavBar';
import ListingCard from './ListingCard';
import '../style/Page.css';

export default class Airbnb extends Component {
constructor (props) {
    super(props);

    this.state = {
        filter: {
            borough : "",
            price: 0
        },
        listings : []
    }

    // this.handleFilterChange = this.handleFilterChange.bind(this);
// this.submitFilter = this.submitFilter.bind(this);
}

// handleFilterChange(e) {
// 	this.setState({
// 		borough: e.target.value
// 	});
// }

// submitLogin() {
// 	fetch("http://localhost:8081/airbnbs/" + JSON.stringify(this.state.filter),
// 	{
// 		method: "GET"
// 	}).then(res => {
// 		return res.json();
// 	}, err => {
// 		console.log(err);
// 	}).then(airbnbsList => {
//         let airbnbCards = airbnbsList.map((airbnb, i) => 
//         <ListingCard 
//         title={airbnb.title}
//         subtitle={airbnb.subtitle}
//         />);

//         this.setState({
//             listings : airbnbCards
//         });
//     }, err => {
//         console.log(err);
//     });
// }

componentDidMount() {
// Send an HTTP request to the server.
    fetch("http://localhost:8081/airbnbs",
    {
    method: 'GET' // The type of HTTP request.
    }).then(res => {
    // Convert the response data to a JSON.
    return res.json();
    }, err => {
    // Print the error if there is one.
    console.log(err);
    }).then(airbnbsList => {
        console.log("HEY IM HERE")
        console.log(airbnbsList);
        // let airbnbCards = airbnbsList.map((airbnb) => 
        // <ListingCard 
        // id={airbnb.id}
        // name={airbnb.name}
        // />);

        // this.setState({
        //     listings : airbnbCards
        // });
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
