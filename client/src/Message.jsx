//TODO: set message to list component


import React, {Component} from 'react';

class Message extends Component {



  render() {

    let newContent = [];
    let tmpContent = this.props.message.content;

    // make an array by white space separated words
    let contentBlocks= tmpContent.match(/([^\s]+)/g);
    
      contentBlocks.forEach((block, index)=>{       

          // if a block was an image url, set html img
          if(block.match(/((https|http):\/\/[^\s]*\.(jpg|png|gif))/g)){
            newContent.push(<div key={index} style={{margin: '0 -5px', overflow: 'hidden'}}><img key={index} src={block}/></div>); 
              
          // if the block was the last one and not image url, set html span  
          }else if(index === contentBlocks.length-1){
            newContent.push(<span key={index} >{block}</span>);

          // if the block was not image url, add white space, and set html span  
          }else{
            newContent.push(<span key={index} >{block}&nbsp;</span>);
          }
      });

    let message =   
          <div className='message'>
            {/* <span className='message-username'  style={{color: "blue"}}>{this.props.message.user.username}</span> */}
            <span className='message-content' ><div className="content-wrapper">{newContent}</div></span>
          </div>;

    let date;
    let stringDate;
    if(this.props.message.created_at){
       date = new Date(this.props.message.created_at);
       stringDate = date.toString().substring(0, 25);
    }
    

    let isCurrentUser = this.props.user_id === this.props.message.user.id
    return (

      // we will adjust about user colour later

      <div className="userMessageContainer" style={{color: isCurrentUser ? "blue" : "#000"}}>
        
        <div className="messageInfoContainer">
          <img src="./images/user-image-2.png" className="userImage"></img>
          {this.props.message.user.username}
          {isCurrentUser ? "  (You)" : ""}
        </div>
           &nbsp;
          {message}
          <p className="messageTime">{stringDate}</p>
      </div>
    );
 }
}

export default Message;
