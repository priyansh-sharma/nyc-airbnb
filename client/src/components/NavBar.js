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
                <NavbarBrand href="\"> NoisYC </NavbarBrand>
                <NavbarToggler />
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href='/airbnbs'>Airbnbs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/bars'>Bars</NavLink>
                    </NavItem>  
                    <NavItem>
                        <NavLink href='/parties'>Parties</NavLink>
                    </NavItem>  
                </Nav>
            </Navbar>
        );
	}
}