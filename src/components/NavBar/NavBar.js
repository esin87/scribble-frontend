import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = (props) => {
	return (
		<Navbar
			collapseOnSelect
			variant='light'
			expand='md'
			style={{ marginBottom: '2.5rem' }}>
			<LinkContainer to='/home'>
				<Navbar.Brand>Scribble</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav>
					<LinkContainer to='/home'>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>

					{!props.loggedIn && (
						<LinkContainer to='/login'>
							<Nav.Link>Log In</Nav.Link>
						</LinkContainer>
					)}
					{!props.loggedIn && (
						<LinkContainer to='/signup'>
							<Nav.Link>Sign Up</Nav.Link>
						</LinkContainer>
					)}

					<LinkContainer to='/about'>
						<Nav.Link>About</Nav.Link>
					</LinkContainer>
					{props.loggedIn && (
						<LinkContainer to='/logout'>
							<Nav.Link>Log Out</Nav.Link>
						</LinkContainer>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
