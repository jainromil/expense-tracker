import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class AppNav extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
