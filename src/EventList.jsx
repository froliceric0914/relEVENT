import React from 'react';
import Event from './Event.jsx';

//This is an container to show event listing. 
//TODO: add styling

const EventList = ({ events }) => {
  return (
    <div className='eventList'>
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