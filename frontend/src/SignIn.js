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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
      isValid: true,
      errorTextEmail: "",
      errorTextPassword: "",
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      errorTextEmail: "",
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      errorTextPassword: "",
    });
  }

  validateAll() {
    let isValid = true;

    this.setState({
      errorTextEmail: "",
      errorTextPassword: "",
    });

    if (this.state.email.length === 0) {
      this.setState({
        errorTextEmail: "Email is required",
      });
      isValid = false;
    }

    if (this.state.password.length === 0) {
      this.setState({
        errorTextPassword: "Password is required",
      });
      isValid = false;
    }

    return isValid;
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    const isFormValid = this.validateAll();
    this.setState({
      isValid: isFormValid,
    });

    if (this.state.isValid) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.history.push("/expenses");
          window.location.reload();
        },
        (error) => {
          this.setState({
            loading: false,
            message: "Login failed, please try again",
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              error={this.state.errorTextEmail.length === 0 ? false : true}
              helperText={this.state.errorTextEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              error={this.state.errorTextPassword.length === 0 ? false : true}
              helperText={this.state.errorTextPassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {this.state.message && (
              <Alert className={classes.alert} severity="error">
                {this.state.message}
              </Alert>
            )}
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignIn);
