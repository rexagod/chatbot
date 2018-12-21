import React from "react";
import LinkedinSDK from "react-linkedin-sdk";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./login.css";
import config from './config.json';
import Welcome from 'react-welcome-page';


const Greeter=(
  <Welcome
      loopDuration={3300}
      data={
          [
            {
              //"backgroundColor": "rgb(20, 20, 20)",
              "textColor": "#4245f4",
              "text": "Hi",
              "image": require('./image_path/1.png'),
              "imageAnimation": "rotateIn",
              "textAnimation":"bounceInDown"
            },
            {
              //"backgroundColor": "rgb(20, 20, 20)",
              "textColor": "#4245f4",
              "text": "Welcome to XaneBot",
              "imageAnimation": "slideInDown",
              "textAnimation": "fadeInDownBig",
              "image": require('./image_path/2.png')
            },
            {
            //  "backgroundColor": "rgb(20, 20, 20)",
              "textColor": "#4245f4",
              "text": "A chatbot for all your needs",
              "imageAnimation": "rotateIn",
              "textAnimation": "fadeInDownBig",
              "image": require('./image_path/3.png')
            }
          ]}
  />
);


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
        {Greeter}
        <center className="shiftdown">
          <img src="http://dev.web.xane.ai/34a11248aa0afc617945aeb3af8b0da2.png" style={{"width":300,"height":100}} alt="Xane.ai"/>
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
