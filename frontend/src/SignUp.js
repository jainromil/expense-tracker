import React, { Component } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  withStyles,
  Container,
} from "@material-ui/core";
import { isLength, isEmail } from "validator";
import Alert from "@material-ui/lab/Alert";
import AuthService from "./AuthService";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorTextFname: "",
      errorTextLname: "",
      errorTextEmail: "",
      errorTextPassword: "",
      errorTextConfirmPassword: "",
      message: "",
      isValid: true,
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
      errorTextFname: "",
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
      errorTextLname: "",
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      errorTextEmail: "",
    });
  }

  onChangePassword(e) {
    if (e.target.value === this.state.confirmPassword) {
      this.setState({
        errorTextConfirmPassword: "",
      });
    }

    this.setState({
      password: e.target.value,
      errorTextPassword: "",
    });
  }

  onChangeConfirmPassword(e) {
    if (this.state.password === e.target.value) {
      this.setState({
        errorTextPassword: "",
      });
    }

    this.setState({
      confirmPassword: e.target.value,
      errorTextConfirmPassword: "",
    });
  }

  validateAll() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;

    this.setState({
      errorTextFname: "",
      errorTextLname: "",
      errorTextEmail: "",
      errorTextPassword: "",
      errorTextConfirmPassword: "",
    });

    let isValid = true;

    if (firstName.length === 0) {
      this.setState({
        errorTextFname: "First Name is required",
      });
      isValid = false;
    }

    if (lastName.length === 0) {
      this.setState({
        errorTextLname: "Last Name is required",
      });
      isValid = false;
    }

    if (email.length === 0) {
      this.setState({
        errorTextEmail: "Email is required",
      });
      isValid = false;
    }

    if (password.length === 0) {
      this.setState({
        errorTextPassword: "Password is required",
      });
      isValid = false;
    }

    if (confirmPassword.length === 0 && password.length === 0) {
      this.setState({
        errorTextConfirmPassword: "Confirm Password is required",
      });
      isValid = false;
    }

    if (!isEmail(email)) {
      this.setState({
        errorTextEmail: "Please enter a valid email address",
      });
      isValid = false;
    }

    if (!isLength(password, { min: 6, max: 40 }) && password.length > 0) {
      this.setState({
        errorTextPassword: "Password should be minimum 6 characters",
      });
      isValid = false;
    }

    if (
      !isLength(confirmPassword, { min: 6, max: 40 }) &&
      confirmPassword.length > 0
    ) {
      this.setState({
        errorTextConfirmPassword: "Password should be minimum 6 characters",
      });
      isValid = false;
    }

    if (password !== confirmPassword) {
      this.setState({
        errorTextPassword: "Passwords do not match",
        errorTextConfirmPassword: "Passwords do not match",
      });
      isValid = false;
    }

    return isValid;
  }

  handleSignUp(e) {
    this.setState({
      isValid: false,
    });

    let isFormValid = this.validateAll();
    this.setState({
      isValid: isFormValid,
    });

    if (this.state.isValid) {
      AuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isValid: false,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            errorTextEmail: resMessage,
            isValid: false,
          });
        }
      );
    }

    e.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={this.state.errorTextFname.length === 0 ? false : true}
                  helperText={this.state.errorTextFname}
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  error={this.state.errorTextLname.length === 0 ? false : true}
                  helperText={this.state.errorTextLname}
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={this.state.errorTextEmail.length === 0 ? false : true}
                  helperText={this.state.errorTextEmail}
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={
                    this.state.errorTextPassword.length === 0 ? false : true
                  }
                  helperText={this.state.errorTextPassword}
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  error={
                    this.state.errorTextConfirmPassword.length === 0
                      ? false
                      : true
                  }
                  helperText={this.state.errorTextConfirmPassword}
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {this.state.message && (
              <Alert className={classes.alert} severity="success">
                {this.state.message}{" "}
                <Link href="/login">Click here to login!</Link>
              </Alert>
            )}
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignUp);
