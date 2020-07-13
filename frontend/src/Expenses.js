import React, { Component } from "react";
import AppNav from "./AppNav";
import "./App.css";
import "date-fns";
import "react-day-picker/lib/style.css";
import Moment from "react-moment";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";
import { FormGroup, Container, Form } from "react-bootstrap";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import authHeader from "./AuthHeader";
import { BASE_API_URL } from "./constants";
import AuthService from "./AuthService";

const API_URL = BASE_API_URL + "/api/";

class Expenses extends Component {
  emptyItem = {
    expenseDate: new Date(),
    description: "",
    amount: "",
    category: {},
    user: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isLoading: true,
      categories: [],
      expenses: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  async componentDidMount() {
    axios.get(API_URL + "categories", {
        headers: authHeader(),
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          categories: response.data,
        });
      });

    axios.get(API_URL + `expenses/${AuthService.getCurrentUser()}`, {
        headers: authHeader(),
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          expenses: response.data,
        });
      });
  }

  async remove(id) {
    axios
      .delete(API_URL + `expense/${id}`, {
        headers: authHeader(),
      })
      .then(() => {
        let updatedExpenses = [...this.state.expenses].filter(
          (i) => i.id !== id
        );
        this.setState({
          expenses: updatedExpenses,
        });
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let email = AuthService.getCurrentUser();
    await axios.get(API_URL + `user/${email}`, {
      headers: authHeader(),
    }).then((response) => {
      let item = { ...this.state.item };
      let user = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password,
      }
      item.user = user;
      this.setState({ item });
    });

    const item = this.state.item;
    axios.post(API_URL + "expense", item, {
      headers: authHeader(),
    });

    this.props.history.push("/expenses");
    window.location.reload();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleCategoryChange(event) {
    const value = event.target.value;
    const name = event.currentTarget.getAttribute("data-name");
    let item = { ...this.state.item };
    let newCategory = {
      id: value,
      name: name,
    };
    item.category = newCategory;
    this.setState({ item });
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expenseDate = date;
    this.setState({ item });
  }

  render() {
    const title = <h3>Add New Expense</h3>;
    const { categories } = this.state;
    const { isLoading, expenses } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    let categoriesList = categories.map((category) => (
      <MenuItem key={category.id} value={category.id} data-name={category.name}>
        {category.name}
      </MenuItem>
    ));

    let expensesList = expenses.map((expense) => (
      <TableRow key={expense.id}>
        <TableCell component="th" scope="row">
          {expense.description}
        </TableCell>
        <TableCell align="center">
          <Moment date={expense.expenseDate} format="MM-DD-YYYY" />
        </TableCell>
        <TableCell align="center">{expense.category.name}</TableCell>
        <TableCell align="center">
          <NumberFormat
            value={expense.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </TableCell>

        <TableCell align="center">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => this.remove(expense.id)}
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
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  placeholder="Expense Description"
                  name="description"
                  onChange={this.handleChange}
                  startAdornment={
                    <InputAdornment position="start"> </InputAdornment>
                  }
                  labelWidth={80}
                  fullWidth
                />
                <FormHelperText id="description-error-text"></FormHelperText>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <OutlinedInput
                  id="amount"
                  placeholder="Expense Amount"
                  name="amount"
                  onChange={this.handleChange}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                  fullWidth
                />
                <FormHelperText id="amount-error-text"></FormHelperText>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  id="category"
                  labelId="category-label"
                  label="Category"
                  value={this.state.item.category.id || ""}
                  onChange={this.handleCategoryChange}
                >
                  {categoriesList}
                </Select>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date"
                  label="Expense Date"
                  format="MM-dd-yyyy"
                  value={this.state.item.expenseDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormGroup>
            <FormGroup>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" variant="contained">
                Clear
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container>
          <h3>Expense List</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{expensesList}</TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
}

export default Expenses;
