// import React, { Component } from 'react';
//
//
// class Chat extends Component {
//   render() {
//     return (
//       <div className='App'>
//         <div className='stage'>
//           <h1>Chat</h1>
//           <div className='chat-logs'>
//           </div>
//           <input
//             value={ this.state.currentChatMessage }
//             onChange={ (e) => this.updateCurrentChatMessage(e) }
//             type='text'
//             placeholder='Enter your message...'
//             className='chat-input'/>
//             <button
//               onClick={ (e) => this.handleSendEvent(e) }
//               className='send'>
//               Send
//             </button>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default Chat;


// old chat

// <div className="chatSpace">
//   <div className="stage">
//   <Scroll width="100%" height="500px" idName="messageList">
//   {/* <div id="messageList"> */}
//     <div className="chatSpaceHeader" style={{position: "sticky", top: "0", backgroundColor: "#fff"}}>
//       <h1 style={{margin: "0"}}>Chat</h1>
//       <div className="closeX" onClick={this.closeChat}>
//         x
//       </div>
//     </div>
//     {/* <i id="closeX" className="fas fa-times fa-2x" onClick={this.closeChat}></i> */}
//         <div className="chat-logs">{messages}</div>
//     {/* </div> */}
//   </Scroll>
//
//     <input
//       value={this.state.currentChatMessage}
//       onChange={e => this.updateCurrentChatMessage(e)}
//       type="text"
//       placeholder="Enter your message..."
//       className="chat-input"
//     />
//     <button
//       onClick={e => this.handleSendEvent(e)}
//       className="send"
//     >
//       Send
//     </button>
//   </div>
// </div>
