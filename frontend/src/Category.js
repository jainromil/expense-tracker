import React, { Component } from "react";
import AppNav from "./AppNav";
import "./App.css";
import { FormGroup, Container, Form } from "react-bootstrap";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import authHeader from "./AuthHeader";
import axios from "axios";
import { BASE_API_URL } from "./constants";

const API_URL = BASE_API_URL + "/api/";

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      categories: [],
      name: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

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

  async remove(id) {
    axios
      .delete(API_URL + `category/${id}`, {
        headers: authHeader(),
      })
      .then(() => {
        let updatedCategories = [...this.state.categories].filter(
          (i) => i.id !== id
        );
        this.setState({
          categories: updatedCategories,
        });
      });
  }

  async handleSubmit(event) {
    axios.post(API_URL + "category", {"name": this.state.name}, {
      headers: authHeader(),
    });

    event.preventDefault();
    this.props.history.push("/categories");
    window.location.reload();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let name = { ...this.state.name };
    name = value;
    this.setState({ name });
  }

  render() {
    const { isLoading, categories } = this.state;
    const title = <h3>Categories</h3>;
    if (isLoading) {
      return "<div>Loading...</div>";
    }

    let categoriesList = categories.map((category) => (
      <TableRow key={category.id}>
        <TableCell component="th" scope="row">
          {category.name}
        </TableCell>
        <TableCell align="center">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => this.remove(category.id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                  id="name"
                  placeholder="Category Name"
                  name="name"
                  onChange={this.handleChange}
                  startAdornment={
                    <InputAdornment position="start"> </InputAdornment>
                  }
                  labelWidth={80}
                  fullWidth
                />
                <FormHelperText id="name-error-text"></FormHelperText>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container>
          <h3>Category List</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{categoriesList}</TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
}

export default Category;
