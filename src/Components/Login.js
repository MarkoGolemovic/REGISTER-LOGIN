import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Styles/LoginAndRegisterSass.scss';
import SnackBar from "./SnackBar";
import validator from 'validator';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Home from "./Home.js";
import Typography from '@material-ui/core/Typography';



export default class Login extends Component {

  constructor(props) {
    super(props);

    this.initState();
    this.checkLogin();
  }

  componentDidMount() {
    this.props.setTitle("Login");
  }

  checkLogin() {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) this.props.history.push("/home");
  }

  initState() {
    this.state = {
      snackbar: {
        isOpen: false,
        message: ""
      },
      history: Home,
      isRemoteValid: true,
      isSubmited: false,
      registerModel: {
        email: {
          value: "mxg6290@g.rit.edu",
          isValid: true,
          error: "",
          isBlur: false
        },
        password: {
          value: "123456",
          isValid: true,
          error: "",
          isBlur: false
        }
      }
    };
  }

  resetState() {
    this.setState({
      isRemoteValid: true,
      isSubmited: false,
      registerModel: {
        email: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        },
        password: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        }
      }
    })
  }

  handleChange(event) {
    this.setValue(event.target.name, event.target.value);
    this.doValidation(event.target.name);
  }

  setValue(name, value) {
    var model = this.state.registerModel;
    model[name].value = value;
    this.setState({ registerModel: model });
  }

  doValidation(name) {
    var model = this.state.registerModel;

    var isValid;

    switch (name) {
      case "email":
        isValid = validator.isEmail(model.email.value) && !validator.isEmpty(model.email.value);
        model.email.isValid = isValid;
        if (!isValid) model.email.error = "Email is wrong";
        else model.email.error = "";
        break;
      case "password":
        model.password.isValid = validator.isLength(model.password.value, { min: 6, max: 8 }) && !validator.isEmpty(model.password.value);
        if (!model.password.isValid) model.password.error = "password must be 6-8 charter";
        else model.password.error = "";
        isValid = model.password.isValid;
        break;
      default:
    }

    this.setState({ registerModel: model });

    return isValid;
  }

  handleBlur(event) {
    this.setBlur(event.target.name);
    this.doValidation(event.target.name);
  }

  setBlur(name) {
    var model = this.state.registerModel;
    model[name].isBlur = true;
    this.setState({ registerModel: model });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isSubmited: true });

    var isValid = true;

    ["email", "password"].forEach((fieldName) => {
      isValid = this.doValidation(fieldName) && isValid;
    });

    // let dataInput = ["email", "password"];
    // for (let index = 0; index < dataInput.length; index++) {
    //   const fieldName = dataInput[index];
    //   isValid = this.doValidation(fieldName) && isValid;
    // }

    // let dataInput = ["email", "password"];
    // for (let index in dataInput) {
    //   const fieldName = dataInput[index];
    //   isValid = this.doValidation(fieldName) && isValid;
    // }

    // let dataInput = ["email", "password"];
    // for (let fieldName of dataInput) {
    //   isValid = this.doValidation(fieldName) && isValid;
    // }

    if (isValid) this.doLogin();
    //<Redirect to="Home.js"/>;
    //window.location="Home";
    //browserHistory.push("/");
  }

  doLogin() {
    var formInput = {
      email: this.state.registerModel.email.value,
      password: this.state.registerModel.password.value
    };
    const url = "https://test-rest.onlyoneif.com/login";
    var options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formInput)

    };

    fetch(url, options)
      .then(response => {
        if (response.status === 400) {
          console.log("ERROR");
          this.setState({ isRemoteValid: false });
          this.setState({ snackbar: { isOpen: true, message: "WRONG DATA FOR LOGIN" } })
          return null;
        }

        return response.json()
      })
      .then(json => {
        if (json == null) {
          console.log("ERROR");
          return;
        }
        console.log(json);
        this.resetState();
        this.setState({ snackbar: { isOpen: true, message: "DATA PASS SUCCESSFULLY" } });
        localStorage.setItem("AUTH_TOKEN", json.token);
        this.props.history.push("/home");
        this.props.onLoginChange();
      })
  }

  showError(fieldName) {
    return (this.state.registerModel[fieldName].isBlur || this.state.isSubmited) && !this.state.registerModel[fieldName].isValid;
  }

  render() {
    return (
      
      
/*
      <div>
      <h1>Login front</h1>
      </div>
*/      
      

      <Grid container justify="center">



        <Box
          boxShadow={3}
          clone>
          <form className={"filed-login"} noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
            <h1>Login</h1>
           

            <div className="filled-email">
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                value={this.state.registerModel.email.value}
                error={this.showError("email")}

              />
              {this.showError("email") ? <div className="error-login">{this.state.registerModel.email.error}</div> : null}
            </div>

            <div className="filled-password">
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                value={this.state.registerModel.password.value}
                error={this.showError("password")}
              />
              {this.showError("password") ? <div className="error-login">{this.state.registerModel.password.error}</div> : null}
            </div>

            <div className="filed-button-login">
              <Button variant="contained" color="primary" className={"classes.button"} id="log-btn"
                type="submit"
                value="Submit"
                size="large">
                Login
          </Button>
            </div>
            <SnackBar
              isOpen={this.state.snackbar.isOpen}
              onClose={() => this.setState({ snackbar: { isOpen: false, message: "" } })}
              message={this.state.snackbar.message}
            />
          </form>
        </Box>
      </Grid>
      



     );
  }
}
