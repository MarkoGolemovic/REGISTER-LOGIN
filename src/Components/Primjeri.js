// ----------------------------
//  Login.js
// ----------------------------

    /*
    componentDidMount(){
     
      var data = {
        "first_name": "Krunoslav",
        "last_name": "Domic",
        "email": "kdomic1@test.com",
        "password": "kdomic123",
        "date_of_birth": "2019-07-23"
      };

      var url = "https://test-rest.onlyoneif.com/register";
      var options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    // fetch(url, options)
    // .then(response => response.json())
    // .then(json => console.log(json));

      // POST

      var token = "";

      var data = {
        "email": "m.m@gmail.com",
        "password": "123456",
      };

      var url = "https://test-rest.onlyoneif.com/login";
      var options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Basic '+ token, 
        },
        body: JSON.stringify(data),
    };

    
    fetch(url, options)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      localStorage.setItem("AUTH_TOKEN", json.token);
      console.log(localStorage.getItem("AUTH_TOKEN"));
    });

    // GET
    var url = "https://test-rest.onlyoneif.com/posts";
    
    var options = {
      headers: {
          'Authorization': 'Bearer '+ localStorage.getItem("AUTH_TOKEN"), 
      }
    };
    fetch(url, options)
    .then(response => response.json())
    .then(json => console.log(json));

    }
    */

// ----------------------------
//  Register.js
// ----------------------------


    /*  
  componentDidMount(){

    var dataForRegister ={
    "first_name" : "Marijo",
    "last_name" : "Mlinaric",
    "email":"m.m@gmail.com",
    "password": "123456",
    "date": "2019-01-01"
  };
  var url="https://test-rest.onlyoneif.com/register";
  var options= {
    method : 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataForRegister)
  };

  fetch(url,options)
  .then(response => response.json())
  .then(json => {console.log(json)

});
  
}
*/

//Wrong  for validation

/*
    if (this.state.registerModel.firstName.length === 0  ||
        this.state.registerModel.lastName.length === 0   || 
        this.state.registerModel.email.length  === 0     ||
        this.state.registerModel.password.length === 0   ||
        this.state.registerModel.date.length === 0 ) {
      
    }

  */  


// Wrong aprouch for validation  
  /*
  validate(fildName, value){
    let emailError=""
    
    if (!this.state.registerModel.email.includes("@")) {
      emailError="Invalided email";
    }


    
  }*/


// Not optional for catching errors
//This catch do not work at all
  
  /*
  fetch(url,options)
    .then(
      function(response){
        if ( response.ok ) {
          console.log(`Some ok response ${response}`);   
          response.json().then(json =>{
            console.log(json);
          });
        } else {
          console.log(`Something not ok with execution ${response}` )
          if (response.status === 400) {
            console.log('We have a problem:  ' + response.status);
            response.json();
            console.log(response);
            return;
          }
        }
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    }
    );
    */

    /*
   <Button variant="contained" color="primary" onClick={() => this.setState({ isOpen: true })}> Open </Button>
   <Button variant="contained" color="primary" onClick={() => this.setState({ isOpen: false })}> Close </Button>
   */

  //{!this.state.isRemoteValid ? <div>PODACI ZA LOGIN NISU ISPRAVNI</div> : null}
  // {!this.state.isRemoteValid ? <div>PODACI ZA LOGIN NISU ISPRAVNI</div> : null}

/*
  <MenuItem
  primaryText="Register"
  containerElement={!this.state.isTokenPresent ? <li> <Link to="/register">Register</Link> </li> : ""}
/>
*/


//Solution for showing MenuItem only where it need to been seen
/*
{this.state.isTokenPresent ? <MenuItem> <Link to="/info"> Info</Link> </MenuItem>: ""}
*/


// Complete solution for acting like a button
//{this.state.isTokenPresent ? <MenuItem onClick={this.handleToggle.bind(this)} component={Link} to="/info">Info</MenuItem> : ""}




/*
{this.state.isTokenPresent ? <MenuItem> <Link to="/info"> Info</Link> </MenuItem>: ""}
                <MenuItem>  {this.state.isTokenPresent ?  <Link to="/logout">Logout</Link>  : ""} </MenuItem>
*/