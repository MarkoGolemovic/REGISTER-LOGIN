import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./Components/Register.js";
import Login from "./Components/Login.js";
import Footer from "./Components/Footer.js";
import Home from "./Components/Home.js";
import Info from "./Components/Info";
//import NewPost from "./Components/NewPost.js";
//import OtherUsers from "./Components/OtherUsers";
//import NewsFeed from "./Components/NewsFeed.js";
import './App.css';
import Container from '@material-ui/core/Container';
import '../src/Styles/Footer.scss';
import '../src/Styles/App.scss';
import Logout from './Components/Logout.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';




//import AppBar from '@material-ui/core/AppBar';
const styles = {
  navBar: { 'top': AppBar.height }

}
export default class App extends Component {



  state = {
    isTokenPresent: false,
    open: false,
    title: ""
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.checkLogin();
  }

  checkLogin() {
    const token = localStorage.getItem("AUTH_TOKEN");
    const isTokenPresent = !!token;
    this.setState({ isTokenPresent });
  }

  onLoginChange() {
    this.checkLogin();
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
    console.log("History: " + window.location.pathname);
  }

  setTitle(title) {
    if (title !== this.state.title) this.setState({ title });

  }

  getTitle() {
    switch (window.location.pathname) {
      case "/":
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/home":
        return "Home";
      case "/info":
        return "Info";
      default:
        return "Error";
    }
  }
  

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className={"classes.root"}>
            <AppBar position="static"
              onClick={this.handleToggle.bind(this)}
            >
              <Toolbar>
                <IconButton edge="start" className={"classes.menuButton"} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={"classes.title"}>
                  {this.state.title}
                </Typography>

              </Toolbar>
            </AppBar>
            <div className="drawer">
              <Drawer
                open={this.state.open}
                width={200}
                containerStyle={styles.navBar}>

                {!this.state.isTokenPresent ? <MenuItem
                  onClick={this.handleToggle.bind(this)}
                  component={Link} to="/register">Register</MenuItem> : ""}

                {!this.state.isTokenPresent ? <MenuItem onClick={this.handleToggle.bind(this)} component={Link} to="/login">Login</MenuItem> : ""}


                {this.state.isTokenPresent ? <MenuItem onClick={this.handleToggle.bind(this)} component={Link} to="/home">Home</MenuItem> : ""}
                {this.state.isTokenPresent ? <MenuItem onClick={this.handleToggle.bind(this)} component={Link} to="/info">Info</MenuItem> : ""}
                {this.state.isTokenPresent ? <MenuItem onClick={this.handleToggle.bind(this)} component={Link} to="/logout">Logout</MenuItem> : ""}

              </Drawer>
            </div>
          </div>
        </MuiThemeProvider>


        <div className="article">
          <Container>
            <nav>
              <ul>
              
                {!this.state.isTokenPresent ? <li> <Link to="/register">Register</Link> </li> : ""}
                {!this.state.isTokenPresent ? <li> <Link to="/login">Login</Link> </li> : ""}

                {this.state.isTokenPresent ? <li> <Link to="/home">Home</Link> </li> : ""}
                {this.state.isTokenPresent ? <li> <Link to="/info"> Info</Link> </li> : ""}


                {this.state.isTokenPresent ? <li> <Link to="/logout">Logout</Link> </li> : ""}
              
              </ul>
            </nav>
          </Container>
          <Container>
            <Route path="/register" exact component={(props) => <Register {...props} setTitle={this.setTitle.bind(this)}  />} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login" component={(props) => <Login {...props} setTitle={this.setTitle.bind(this)} onLoginChange={this.onLoginChange.bind(this)} />} />
            <Route exact path="/" component={(props) => <Login {...props} setTitle={this.setTitle.bind(this)} onLoginChange={this.onLoginChange.bind(this)} />} />

            <Route path="/home" component={(props) => <Home {...props} setTitle={this.setTitle.bind(this)} onLoginChange={this.onLoginChange.bind(this)} />} />

            <Route path="/logout" component={(props) => <Logout {...props} setTitle={this.setTitle.bind(this)} onLoginChange={this.onLoginChange.bind(this)} />} />
            <Route path="/info" component={(props) => <Info {...props} setTitle={this.setTitle.bind(this)}  />} />

          </Container>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}


