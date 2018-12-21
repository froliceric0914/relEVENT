import React from "react";
import Event from "./Event.jsx";

//This is an container to show event listing.
//TODO: add styling

const EventList = ({ events, openChat }) => {
  return (
    <div className="eventList">
      {events.map(event => {
        return <Event key={event.id} event={event} openChat={openChat}/>;
      })}
    </div>
  );
};

export default EventList;
