import React, { Component } from "react";
import AppNav from "./AppNav";
import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://romilexpense.herokuapp.com/api/";

class Category extends Component {
  state = {
    isLoading: true,
    categories: [],
  };

  async componentDidMount() {
    axios.get(API_URL + "categories", {
      headers: authHeader(),
    }).then(response => {
      this.setState({
        isLoading: false,
        categories: response.data,
      });
    });
  }

  render() {
    const { isLoading, categories } = this.state;
    if (isLoading) {
      return "<div>Loading...</div>";
    }

    return (
      <div>
        <AppNav />
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category.id} id={category.id}>{category.name}</div>
        ))}
      </div>
    );
  }
}

export default Category;
