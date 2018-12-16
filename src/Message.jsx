
import React, {Component} from 'react';

class Message extends Component {
  
  render() {

    let newContent = [];
    let tmpContent = this.props.message.content.slice();

    // make an array by white space separated words
    let contentBlocks= tmpContent.match(/([^\s]+)/g);
    
      contentBlocks.forEach((block, index)=>{       

          // if a block was an image url, set html img
          if(block.match(/((https|http):\/\/[^\s]*\.(jpg|png|gif))/g)){
            newContent.push(<div key={index} style={{margin: '0 -5px', borderRadius: '15px', overflow: 'hidden', border: `5px solid ${this.props.message.ownerColor}`}}><img key={index} src={block}/></div>); 
              
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
            <span className='message-username'  style={{color: this.props.message.ownerColor}}>{this.props.message.username}</span>
            <span className='message-content' ><div className="content-wrapper" style={{backgroundColor: this.props.message.ownerColor, color: 'white'}}>{newContent}</div></span>
          </div>;

    let notification = 
          <div className='message notification'>
            <span className='notification-content' style={{color: this.props.message.ownerColor}}>{this.props.message.content}</span>
          </div>;
    
    // switch message to notification depends on the type
    if (this.props.message.type === 'incomingNotification') {
       message = notification;
    }

    return ( 
      <div>
        {message} 
      </div>
    );
  }
}

export default Message;