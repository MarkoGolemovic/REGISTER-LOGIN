import React, {Component} from 'react';
import Button from '@material-ui/core/Button';


export default class Logout extends Component{
    
    constructor(props){
        super(props);
        this.logout();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    inintState(){
        this.state ={
            isSubmited: false
        };
    }

   


    logout(){
        const token=localStorage.getItem("AUTH_TOKEN");
        if(token){
          this.props.history.push("/");               
          localStorage.clear();
          this.props.onLoginChange();
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event) {
        event.preventDefault();
        this.logout();
      }



    render() {
        return (
      <Button variant="contained" className={"classes.button"} value="submit" type="submit"  onSubmit={this.handleSubmit} >
        Logout
      </Button>
        );
    }



}