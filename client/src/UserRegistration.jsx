import React, { Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "eric11111@eric.com",
      username: "ericcool1",
      password: "1234567"
    };
  }

  _handleSubmit = e => {
    const { email, username, password } = this.state;
    alert("submit the form");
    const user = fetch("http://localhost:8080/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ user: { email, username, password } })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("user data from backend", data);
        this.props.setUser({
          status: true,
          username: data.object.username,
          userID: data.object.id
        });
        bake_cookie("userCookie", this.props.userState);
      });
    $(".userRegistration").slideUp();
  };

  render() {
    return (
      <div className="container registration-wrappers">
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
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default UserRegistration;
