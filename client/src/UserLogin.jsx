import React, { Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import "../styles/userLogin.scss";
//submit a form of the user name&password
//TODO: import the api function(route. method,callback)
class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "eric11111@eric.com",
      password: "1234567"
    };
    // this._handleSubmit = this._handleSubmit.bind(this);
  }
  //

  _list = id => {
    fetch(`http://localhost:8080/users/${id}/events`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          this.props.setList({
            listItems: data
          });
        }
      });
  };

  _handleSubmit = e => {
    const { email, password } = this.state;

    // this.props.setComponentLogin({ showCompoenent: false });
    // console.log("showComponent:", this.props.setComponentLogin);
    alert("Submit Login");

    // console.log("userLoginInfo", { email, password });
    const user = fetch("http://localhost:8080/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ user: { email, password } })
    })
      .then(res => {
        // console.log("ress", res);
        return res.json();
      })
      .then(data => {
        console.log("user_login data from backend", data);
        this.props.setUser({
          status: true,
          username: data.object.username,
          userID: data.object.id
        });
        this._list(this.props.userState.userID);
        bake_cookie("userCookie", this.props.userState);
        console.log("login-user: ", read_cookie("userCookie"));
      });
    //call the props and change the state of user in app.js
    // this.props.UserLogin(email, username, password);
    // $(".userLogin").slideUp();
    document.querySelector(".login-wrapper").style.display = "none";
  };

  render() {
    return (
      <div className="loginbox">
        <h1>User Login</h1>
        <img src="../images/avatar-login.png" className="avatar" />
        <div
          className="close"
          onClick={e => {
            document.querySelector(".login-wrapper").style.display = "none";
          }}
        >
          +
        </div>
        <h2 for="user-email">Email</h2>
        <input
          type="email"
          // id="login-rmail"
          className="form-user"
          onChange={e => {
            this.setState({
              email: e.target.value
            });
          }}
          value={this.state.email}
        />
        <h2 for="user-password">Password</h2>
        <input
          type="text"
          // id="login-username"
          className="form-user"
          onChange={e => {
            this.setState({
              password: e.target.value
            });
          }}
          value={this.state.password}
        />
        <button
          onClick={this._handleSubmit}
          type="submit"
          className="submitBtn"
          id="submitBtn"
        >
          Login in
        </button>
      </div>
    );
  }
}

export default UserLogin;
