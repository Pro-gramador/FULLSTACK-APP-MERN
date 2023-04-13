import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const Header = () => {

  const navData = [
    {name:'Home', link:'/'},
    {name:'Movies', link:'/movies'},
    {name:'Tv Series', link:'/series'},
    {name: 'About Us', link: '/about'},
    {name: 'Account', link: '/login'},
  ];

  return (
    <header className="header">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand>Hottest Movies</Navbar.Brand>
          
          <Navbar.Toggle area-contrls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeight: "100px" }}
              navbarScroll>
            
              {navData.map((item) => {
                return (
                  <nav key={item.name}>
                    <Link to={item.link}>{item.name}</Link>
                  </nav>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
