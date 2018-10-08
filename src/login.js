import React from "react";
import LinkedinSDK from "react-linkedin-sdk";
import "./login.css";

class Login extends React.Component {


  render() {
    const responseLinkedin = response => {
      sessionStorage.setItem("firstName", response.firstName);
      sessionStorage.setItem("lastName", response.lastName);
      sessionStorage.setItem("email", response.emailAddress);
      sessionStorage.setItem("companyId", 8);
      window.location.reload();
    };

    return (
      <React.Fragment>
        <center className="shiftdown">
          <img src="http://dev.web.xane.ai/34a11248aa0afc617945aeb3af8b0da2.png" alt="Xane.ai"/>
          <br />
          <br />
          <br />
          <br />
          <LinkedinSDK
            clientId="77xlojcghub00g"
            callBack={responseLinkedin}
            fields=":(first-name,last-name,email-address)"
            className={"loginbutton"}
            loginButtonText={"Login with LinkedIn"}
            logoutButtonText={"Logout"}
            buttonType={"button"}
          />
        </center>
      </React.Fragment>
    );
  }
}

export default Login;