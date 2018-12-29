import React, { Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
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
    fetch(
    `http://localhost:8080/users/${id}/events`,
    )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log("received ",data);
      if (data) {
        this.props.setList({
          listItems: data
        });
      }
    });
  }

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
  };

  render() {
    return (
      <div claseName="container login-wrappers">
        <div className="login-form">
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

        <div className="login-form">
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
            Login in
          </button>
        </div>
      </div>
    );
  }
}

export default UserLogin;
