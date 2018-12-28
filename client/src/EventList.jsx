import React from "react";
import Event from "./Event.jsx";

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
