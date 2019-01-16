import React, { Component } from "react";
import Message from "./Message.jsx";

//This is the message container

class MessageList extends Component {
  render() {
    // make a message array
    // let messages = this.props.messages.map((message, i)=>{
    //     return <Message key = {i} message = {message}/>
    // });

    return (
      <div className="messageList">
        {/* {messages}
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div> */}
      </div>
    );
  }
}

export default MessageList;
