import React from "react";
import Event from "./Event.jsx";

//This is an container to show event listing.
//TODO: add styling

const EventList = ({ events, openChat, handleIconClick}) => {
  return (
    <div className="eventList">
      {events.map(event => {
        return <Event key={event.id} event={event} openChat={openChat} handleIconClick={handleIconClick}/>;
      })}
    </div>
  );
};

export default EventList;
