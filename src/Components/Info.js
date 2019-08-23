import React, {Component} from "react";

export default class Info extends Component{
    
    constructor(props){
        super(props)
        this.checkLogin();
    }

    componentDidMount() {
        this.props.setTitle("Info");
    }

    checkLogin() {
        const token = localStorage.getItem("AUTH_TOKEN");
        if (!token) this.props.history.push("/login");
    }

    render() {
        return (
             <h1>This app is bulid in React.js and using Material UI</h1>
        );
    }
}