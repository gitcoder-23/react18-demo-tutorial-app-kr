import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const MenuBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/usertodo">Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="ml-auto">
            <Nav.Link href="/">Todo App</Nav.Link>
            <Nav.Link href="/taskapp">Todo Task App</Nav.Link>
            <Nav.Link href="/task/newtodo">NewTodo App</Nav.Link>
            <Nav.Link href="/json/usercrud">Json Placeholder Crud</Nav.Link>
            <Nav.Link href="/jsonserver/newuserlist">Json Server Crud</Nav.Link>
            <NavDropdown title="Validation" id="basic-nav-dropdown">
              <NavDropdown.Item href="/validation/regexvalidation">Regex Validation</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MenuBar;
