import React, { Component } from 'react';
import AppNav from './AppNav';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <div>
          <h2 align="center">Please login to enter expenses</h2>
        </div>
      </div>
    );
  }
}

export default Home;