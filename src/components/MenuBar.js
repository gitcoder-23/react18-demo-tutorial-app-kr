import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const MenuBar = () => {
  const logOutClick = () => {
    localStorage.removeItem("userdata");
    sessionStorage.removeItem("usersessiondata");
    window.location.reload();
  };
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
              <NavDropdown.Item href="/regexvalidation">Add Employee</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/regexvalidation/viewlist">
               All Employee List
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="React Hook Form" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reacthookform/addemployee">React Hook Add</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/regexvalidation/viewlist">
               All Employee List
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Container>
          <Navbar.Brand href="/usertodo">Todo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <Nav.Link href="/">Todo App</Nav.Link>
              <Nav.Link href="/taskapp">Todo Task App</Nav.Link>
              <Nav.Link href="/task/newtodo">NewTodo App</Nav.Link>
              <Nav.Link href="/json/usercrud">Json Placeholder Crud</Nav.Link>
              <Nav.Link href="/jsonserver/newuserlist">
                Json Server Crud
              </Nav.Link>
              <NavDropdown title="Validation" id="basic-nav-dropdown">
                <NavDropdown.Item href="/validation/regexvalidation">
                  Regex Validation
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                onClick={() => logOutClick()}
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </>
  );
};

export default MenuBar;
