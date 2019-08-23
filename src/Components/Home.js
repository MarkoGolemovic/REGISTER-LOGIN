import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../Styles/Home.scss';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.checkLogin();
    }

    componentDidMount() {
      this.props.setTitle("Home");
    }

    checkLogin() {
        const token = localStorage.getItem("AUTH_TOKEN");
        if (!token) this.props.history.push("/login");
    }

    logout() {
        localStorage.removeItem("AUTH_TOKEN");
        this.props.history.push("/");
        this.props.onLoginChange();
    }

    render() {
        return (
            <div>
                <h1>This is home page</h1>
                <Button variant="contained" className={"classes.button"} value="submit" type="submit"
                    onClick={this.logout.bind(this)}
                >
                    Logout
            </Button>
            </div>

        );
    }
}

