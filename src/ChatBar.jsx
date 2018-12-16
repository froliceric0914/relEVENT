import React, {Component} from 'react';

//TODO: styling, set at a proper position

class ChatBar extends Component{
  render() {
    return (
     <div className='chatbar'>

        <input className='chatbar-username' placeholder='Your Name (Optional)' 
        onKeyPress= '' />

        <input className='chatbar-message' placeholder='Type a message and hit ENTER' 
        onKeyPress= '' />

     </div>
    );
  }
}

export default ChatBar;