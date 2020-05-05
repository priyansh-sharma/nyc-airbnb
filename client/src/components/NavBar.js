import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

export default class NavBar extends Component {
    render() {
		return (
			<Navbar color="dark" dark expand="md">
                <NavbarBrand href="\airbnbs"> 
                <img className="logo" style={{width: "50%", height: "50%", marginBottom: "-35px", marginLeft: "-30px"}}src={require('../style/NoisYC.png')} alt="Logo"></img> 
                </NavbarBrand>

            </Navbar>
        );
	}
}