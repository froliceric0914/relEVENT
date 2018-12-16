import React from 'react';
import Event from './Event.jsx';


const EventList = ({ events }) => {
  return (
    <div>
      {
        events.map((event, i) => {
          return (
            <Event key={i} event={event}/>
          );
        })
      }
    </div>
  );
}

export default EventList;