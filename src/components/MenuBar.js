import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const MenuBar = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-right">
            <Nav.Link href="/">Todo App</Nav.Link>
            <Nav.Link href="/taskapp">Todo Task App</Nav.Link>
            <Nav.Link href="/task/newtodo">NewTodo App</Nav.Link>
            <Nav.Link href="/json/usercrud">Json Placeholder Crud</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuBar;
