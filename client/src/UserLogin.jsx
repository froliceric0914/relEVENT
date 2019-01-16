import React, { Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import PasswordMask from "react-password-mask";

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  _handleSubmit = e => {
    const { email, password } = this.state;
    const user = fetch("http://localhost:8080/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ user: { email, password } })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("user_login data from backend", data);
        if (data.status == 500) {
          $(".error-log").text("email or password is incorrect");
          setTimeout(function () {
            $(".error-log").text("");
          }, 3000);
          return;
        }
        this.props.setUser({
          status: true,
          username: data.object.username,
          userID: data.object.id
        });
        this.props.getUserEventListInDB(this.props.userState.userID);
        bake_cookie("userCookie", this.props.userState);
        document.querySelector(".login-wrapper").style.display = "none";
        $("body").removeClass("stop-scrolling");
      });
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
            $("body").removeClass("stop-scrolling");
          }}
        >
          +
        </div>
        <h2 htmlFor="user-email">Email</h2>
        <input
          type="email"
          // id="login-rmail"
          className="form-user-login"
          onChange={e => {
            this.setState({
              email: e.target.value
            });
          }}
          value={this.state.email}
        />
        <h2>Password</h2>
        <PasswordMask
          id="password-login"
          type="text"
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
          Login
        </button>
        <div className="error-log" />
      </div>
    );
  }
}

export default UserLogin;
