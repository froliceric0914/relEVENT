//TODO: set message to list component


import React, {Component} from 'react';

class Message extends Component {

  render() {

    let isCurrentUser = this.props.user_id === this.props.message.user.id
    return (

      // we will adjust about user colour later

      <div style={{color: isCurrentUser ? "blue" : "#000"}}>
        {this.props.message.user.username}
        {isCurrentUser ?
        "(You)" : ""}
         &nbsp;
        {this.props.message.content}
      </div>
    );
 }
}

export default Message;
