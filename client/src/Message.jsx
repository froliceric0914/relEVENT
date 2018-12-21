//TODO: set message to list component


import React, {Component} from 'react';

class Message extends Component {

  render() {

    return (
      <div>
        {this.props.user.username} &nbsp;
        {this.props.message.content}
      </div>
    );
 }
}

export default Message;
