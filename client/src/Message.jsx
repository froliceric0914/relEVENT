//TODO: set message to list component


import React, {Component} from 'react';

class Message extends Component {



  render() {

    let date = new Date(this.props.message.created_at);
    let stringDate = date.toString().substring(0, 25);

    let isCurrentUser = this.props.user_id === this.props.message.user.id
    return (

      // we will adjust about user colour later

      <div className="userMessageContainer" style={{color: isCurrentUser ? "blue" : "#000"}}>
        <div className="messageInfoContainer">
          <img src="./images/user-image-2.png" className="userImage"></img>
          {this.props.message.user.username}
          {isCurrentUser ? "  (You):   " : ""}
        </div>
           &nbsp;
          <p className="messageContent">{this.props.message.content}</p>
          <p className="messageTime">{stringDate}</p>
      </div>
    );
 }
}

export default Message;
