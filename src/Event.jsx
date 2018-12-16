import React from 'react';

//This is an event info pane for an event. 
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const Event = ({event}) => {

  return (

    <div className='eventPanel'> 
      <div >
      {event.name.text} 
      </div>

      <button>chat</button>&nbsp;
      <button>add to list</button>
    </div>
  );
}

export default Event;