import React from 'react'
import {Navbar, Nav, Container} from "react-bootstrap"

function Header() {

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">RecipeStash</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/">Recipes</Nav.Link>
                    <Nav.Link href="/">
                        <i className='fas fa-user'></i>Sign In</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header