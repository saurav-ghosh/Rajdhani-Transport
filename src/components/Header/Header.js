import React, { useContext } from 'react';
import { Container, Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand className="logo" as={Link} to="/home">RAJDHANI TRANSPORTS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto header">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/destination">Destination</Nav.Link>
                <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                {loggedInUser.email 
                    ? <span className="user-name">{loggedInUser.email}</span>
                    : <Button as={Link} to="/login" className="login-button" variant="danger">login</Button>
                }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;