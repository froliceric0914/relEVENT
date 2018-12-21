import React, { Component } from "react";
//submit a form of the user name&password

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: ""
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

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
                username: e.target.keyword
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
                email: e.target.keyword
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
                password: e.target.keyword
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

export default UserRegistration;
