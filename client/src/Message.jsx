import React from 'react';

const Message = ({ message, user_id }) => {
  let newContent = [];
  let tmpContent = message.content;

  let contentBlocks = tmpContent.match(/([^\s]+)/g);

  contentBlocks.forEach((block, index) => {

    if (block.match(/((https|http):\/\/[^\s]*\.(jpg|png|gif))/g)) {
      newContent.push(<div key={index} style={{ margin: '0 -5px', overflow: 'hidden' }}><img key={index} src={block} /></div>);

    } else if (index === contentBlocks.length - 1) {
      newContent.push(<span key={index} >{block}</span>);

    } else {
      newContent.push(<span key={index} >{block}&nbsp;</span>);
    }
  });

  let messageObj =
    <div className='message'>
      <span className='message-content' ><div className="content-wrapper">{newContent}</div></span>
    </div>;

  let date;
  let stringDate;

  if (message.created_at) {
    date = new Date(message.created_at);
    stringDate = date.toString().substring(0, 25);
  }

  let isCurrentUser = user_id === message.user.id

  return (

    <div className="userMessageContainer" style={{ color: isCurrentUser ? "blue" : "#000" }}>

      <div className="messageInfoContainer">
        <img src="./images/user-image-2.png" className="userImage"></img>
        {message.user.username}
        {isCurrentUser ? "  (You)" : ""}
      </div>
      &nbsp;
          {messageObj}
      <p className="messageTime">{stringDate}</p>
    </div>
  );
}

export default Message;
