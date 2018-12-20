import React from "react";
import LinkedinSDK from "react-linkedin-sdk";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./login.css";
import config from './config.json';

class LoginUtils extends React.Component{

  constructor(){
    super();
    this.state={ isAuthenticated:false };//Authentication is not yet functional. The state can be passed on to index.js
  }
  logout=() => {
    this.setState({ isAuthenticated:false });
    window.location.reload();
  }
  login=() => {
    this.setState({ isAuthenticated:true });
    window.location.reload();
  }
  onFailure = (error) => {
      alert(error);
    };
  responseLinkedin = response => {
    sessionStorage.setItem("firstName", response.firstName);
    sessionStorage.setItem("lastName", response.lastName);
    sessionStorage.setItem("email", response.emailAddress);
    sessionStorage.setItem("companyId", 8);
    //console.log(sessionStorage.getItem("firstName"));
    this.login();
    };

  responseGoogle= response => {
    sessionStorage.setItem("firstName",response.getBasicProfile().getGivenName());
    sessionStorage.setItem("lastName",response.getBasicProfile().getFamilyName());
    sessionStorage.setItem("email",response.getBasicProfile().getEmail());
    sessionStorage.setItem("companyId", 8);
    //console.log(sessionStorage.getItem("firstName"));
    this.login();
  };

  facebookResponse=response => {
    console.log(response);
  };

  render(){
    return(
      <div className="LoginPane">
      <LinkedinSDK
        clientId={config.LINKEDIN_CLIENT_ID}
        callBack={this.responseLinkedin}
        fields=":(first-name,last-name,email-address)"
        className={"loginbutton"}
        loginButtonText={"Login with LinkedIn"}
        logoutButtonText={"Logout"}
        buttonType={"button"}
      />
      <br />
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        //For custom styling uncomment the following lines
        /*render={renderProps => (
          <button className="loginbutton" onClick={renderProps.onClick}>Login to Google</button>
        )}*/
        onSuccess={this.responseGoogle}
        onFailure={this.onFailure}
      />
      <br />
      <br />
      <FacebookLogin
         appId={config.FACEBOOK_APP_ID}
         autoLoad={false}
         fields="name,email,picture"
         size="small"
         //For custom styling uncomment the following lines and change FacebookLogin Import
         /*render={renderProps => (
           <button className="loginbutton" onClick={renderProps.onClick}><span className="icon"></span>Login to FB</button>
         )}*/
         callback={this.facebookResponse}
        />
      </div>
    );
  }
};

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <center className="shiftdown">
          <img src="http://dev.web.xane.ai/34a11248aa0afc617945aeb3af8b0da2.png" alt="Xane.ai"/>
          <br />
          <br />
          <br />
          <br />
          <LoginUtils />
        </center>
      </React.Fragment>
    );
  }
}

export default Login;
