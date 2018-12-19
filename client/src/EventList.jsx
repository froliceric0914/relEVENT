import React from "react";
import Event from "./Event.jsx";

//This is an container to show event listing.
//TODO: add styling

const EventList = ({ events }) => {
  return (
    <div className="eventList">
      {events.map(event => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventList;
