import React, { Component } from "react";
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
  _handleSubmit = e => {
    const { email, password } = this.state;
    alert("Submit Login");
    console.log("userLoginInfo", { email, password });
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
        console.log("user data from backend", data);
        this.props.setUser({
          user: {
            status: true,
            user: data.object.username,
            userID: data.object.id
          }
        });
        console.log("login-user: ", this.props.loginUser);
      });
    //call the props and change the state of user in app.js
    // this.props.UserLogin(email, username, password);
  };

  render() {
    return (
      <div claseName="container registration-wrappers">
        <div className="registration-form">
          <label for="user-name">Username</label>
          <input
            type="text"
            id="login-username"
            className="form-user"
            onChange={e => {
              this.setState({
                username: e.target.value
              });
            }}
            value={this.state.username}
          />
        </div>

        <div className="registration-form">
          <label for="user-email">Email</label>
          <input
            type="email"
            id="login-rmail"
            className="form-user"
            onChange={e => {
              this.setState({
                email: e.target.value
              });
            }}
            value={this.state.email}
          />
        </div>

        <div className="registration-form">
          <label for="user-password">Password</label>
          <input
            type="text"
            id="login-username"
            className="form-user"
            onChange={e => {
              this.setState({
                password: e.target.value
              });
            }}
            value={this.state.password}
          />
        </div>

        <div className="form-group">
          <button
            onClick={this._handleSubmit}
            type="submit"
            className="mt-5 form-control btn btn-success"
            id="submitBtn"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default UserLogin;
