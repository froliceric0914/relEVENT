//TODO: set message to list component


import React, {Component} from 'react';

class Message extends Component {

  render() {

    let isCurrentUser = this.props.user_id === this.props.message.user.id
    return (

      // we will adjust about user colour later

      <div className="userMessageContainer" style={{color: isCurrentUser ? "blue" : "#000"}}>
        <img src="./images/user-image-2.png" className="userImage"></img>
        {this.props.message.user.username}
        {isCurrentUser ?
        "  (You):   " : ""}
         &nbsp;
        <p className="messageTime">2019-01-4</p>
        <p className="messageContent">{this.props.message.content}</p>
      </div>
    );
 }
}

export default Message;
