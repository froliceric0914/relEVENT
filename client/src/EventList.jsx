import React from "react";
import Event from "./Event.jsx";

//This is an container to show event listing.
//TODO: add styling

const EventList = ({
  events,
  openChat,
  handleIconClick,
  listItems,
  listItemSelected,
  handleXIconOnEventClick,
  allEvents
}) => {
  return (
    <div className="eventList row">
      {events.map(event => {
        return {
          /* <Event
            key={event.id}
            event={event}
            openChat={openChat}
            handleIconClick={handleIconClick}
            listItems={listItems}
            listItemSelected={listItemSelected}
            handleXIconOnEventClick={handleXIconOnEventClick}
            allEvents={allEvents}
          /> */
        };
      })}
    </div>
  );
};

export default EventList;
