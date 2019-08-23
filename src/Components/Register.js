import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Styles/LoginAndRegisterSass.scss';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import SnackBar from "./SnackBar";
//import { ValidatorForm } from 'react-form-validator-core';
import validator from 'validator';
import Box from '@material-ui/core/Box';
import Home from "./Home.js";
//import PropTypes from "prop-types";


export default class Register extends Component {


  constructor(props) {
    super(props);


    this.initState();
    this.checkLogin();

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeByDate = this.handleChangeByDate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  componentDidMount() {
    this.props.setTitle("Register");
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
      isLoading: false,
      isOpen: false,
      message: "",
      registerModel: {
        firstName: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        },
        lastName: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        },
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
        },
        date: {
          value: "2014-01-01",
          isValid: true,
          error: "",
          isBlur: false
        },
      }
    };
  }

  resetState() {
    this.setState({
      isRemoteValid: true,
      isSubmited: false,
      isLoading: false,
      isOpen: false,
      message: "",
      registerModel: {
        firstName: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        },
        lastName: {
          value: "",
          isValid: true,
          error: "",
          isBlur: false
        },
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
        },
        date: {
          value: "2014-01-01",
          isValid: true,
          error: "",
          isBlur: false
        },
      }
    });
  }


  //Be carful with Call Order 
  handleChangeByDate(date) {
    var model = this.state.registerModel;
    model['date'].value = moment(date).format("YYYY-MM-DD");
    this.setState({ registerModel: model });
    console.log(this.state.registerModel);
  }


  handleChange(event) {
    this.setValue(event.target.name, event.target.value)
    console.log(this.state.registerModel);
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
        model.email.isValid = validator.isEmail(model.email.value) && !validator.isEmpty(model.email.value);
        if (!model.email.isValid) model.email.error = "Email is wrong";
        else model.email.error = "";
        isValid = model.email.isValid;
        break;
      case "password":
        model.password.isValid = validator.isLength(model.password.value, { min: 6, max: 8 }) && !validator.isEmpty(model.password.value);
        if (!model.password.isValid) model.password.error = "Password must be 6-8 charter";
        else model.password.email = "";
        isValid = model.password.isValid;
        break;
      case "firstName":
        model.firstName.isValid = validator.isAlpha(model.firstName.value) && !validator.isEmpty(model.firstName.value);
        if (!model.firstName.isValid) model.firstName.error = "First name is wrong";
        else model.email.error = "";
        isValid = model.firstName.isValid;
        break;
      case "lastName":
        model.lastName.isValid = validator.isAlpha(model.lastName.value) && !validator.isEmpty(model.lastName.value);
        if (!model.lastName.isValid) model.lastName.error = "Last name is wrong";
        else model.lastName.error = "";
        isValid = model.lastName.isValid;
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

    ["firstName", "lastName", "email", "password"].forEach((fieldName) => {
      isValid = this.doValidation(fieldName) && isValid;
    });


    if (isValid) this.doLogin();

  }

  doLogin() {
    var formInput = {
      first_name: this.state.registerModel.firstName.value,
      last_name: this.state.registerModel.lastName.value,
      email: this.state.registerModel.email.value,
      password: this.state.registerModel.password.value,
      date: this.state.registerModel.date.value
    };
    const url = "https://test-rest.onlyoneif.com/register";
    var options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formInput)
    };

    this.setState({ isLoading: true });



    fetch(url, options)
      .then(response => {
        if (response.status === 400) {
          console.log("ERROR");
          this.setState({ isRemoteValid: false });
          this.setState({ snackbar: { isOpen: true, message: "WRONG DATA FOR LOGIN" } })
          return;
        }
        return response.json();
      })
      .then(json => {
        if (json == null) {
          console.log("ERROR");
          return;
        }
        console.log(json);
        this.resetState();
        this.setState({ snackbar: { isOpen: true, message: "DATA PASS SUCCESSFULLY" } });
        this.props.history.push("/login");



      })

    this.setState({ isLoading: false });

  }

  showError(fieldName) {
    return (this.state.registerModel[fieldName].isBlur || this.state.isSubmited) && !this.state.registerModel[fieldName].isValid;

  }





  getLoadingIndicator() {
    if (this.state.isLoading) {
      return (<CircularProgress />);
    }
    return null;
  }


  render() {
    return (

      <Grid container justify="center">
        <Box
          boxShadow={3}
          clone>
          <form className={"filed-register"} noValidate autoComplete="off" onSubmit={this.handleSubmit}>


            <h1>Register</h1>
            <div className="filled-FirstName">
              <TextField
                name="firstName"
                id="filled-FirstName-input"
                label="First Name"
                className={"classes.textField"}
                value={this.state.registerModel.firstName.value}
                onChange={this.handleChange}
                margin="normal"
                error={this.showError("firstName")}
                onBlur={this.handleBlur}
                variant="outlined"


              />
              {this.showError("firstName") ? <div className="error-register">{this.state.registerModel.firstName.error}</div> : null}
            </div>

            <div className="filled-LastName">
              <TextField
                id="filled-LastName-input"
                label="Last Name"
                variant="outlined"
                className={"classes.textField"}
                value={this.state.registerModel.lastName.value}
                onChange={this.handleChange}
                margin="normal"
                name="lastName"
                error={this.showError("lastName")}
                onBlur={this.handleBlur}
              />
              {this.showError("lastName") ? <div className="error-register">{this.state.registerModel.lastName.error}</div> : null}
            </div>

            <div className="filled-email">
              <TextField
                id="filled-email-input"
                label="Email"
                className={"classes.textField"}
                value={this.state.registerModel.email.value}
                onChange={this.handleChange}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                error={this.showError("email")}
                onBlur={this.handleBlur}
              />
              {this.showError("email") ? <div className="error-register">{this.state.registerModel.email.error}</div> : null}
            </div>

            <div className="filled-password">
              <TextField
                id="filled-password-input"
                label="Password"
                className={"classes.textField"}
                value={this.state.registerModel.password.value}
                onChange={this.handleChange}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                name="password"
                error={this.showError("password")}
                onBlur={this.handleBlur}
              />
              {this.showError("password") ? <div className="error-register">{this.state.registerModel.password.error}</div> : null}

            </div>


            <div className="filled-date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={"classes.grid"} justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="mui-pickers-date"
                    label="Date picker"
                    value={this.state.registerModel.date.value}
                    onChange={this.handleChangeByDate}
                    format="yyyy/MM/dd"
                    name="date"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',

                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>


            <div className="filed-button-register">
              <Button variant="contained" color="primary" className={"classes.button"}
                type="submit"
                value="Submit"
                size="large"
                id="reg-btn"
                disabled={this.state.isLoading}>
                Register
          </Button>
            </div>

            <div className="progress-bar">
              {this.state.isLoading ? <CircularProgress /> : ""}
              {/* {this.getLoadingIndicator()} */}

            </div>



            <SnackBar
              /*
              isOpen={this.state.isOpen}
              onClose={() => this.setState({ isOpen: false })}
              message={this.state.message}
              */

              // //message={()=> this.setState({message:"New User registred"})}
              // //
              // //isOpen={this.state.message="New User"} 
              // //onClick{() => this.setState(message:"Usere registered")}
              // //this.setState({message:"User registered"});

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