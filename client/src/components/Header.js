import React from 'react'
import {Navbar, Nav, Container} from "react-bootstrap"

function Header(props) {

    function clearStorage() {
        if(props.loginStatus === "Logout") {
            localStorage.removeItem("token")
        }
    }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">RecipeStash</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/recipes/create/">Create recipe</Nav.Link>
                    <Nav.Link href="/login" onClick={clearStorage}><i className='fas fa-user'></i>{props.loginStatus}</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header