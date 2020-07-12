import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthService from "./AuthService";

class AppNav extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false,
    };

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  async componentDidMount() {
    if (AuthService.isLoggedIn()) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  onClickLogout() {
    AuthService.logout();
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
          <Nav>
            {!this.state.loggedIn && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {this.state.loggedIn && (
              <Nav.Link href="/" onClick={this.onClickLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
