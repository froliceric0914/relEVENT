
import React from 'react';

const Event = ({event}) => {

  return (
    <div> 
      {event.name.text}
    </div>
  );
}

export default Event;