import React from "react";
import Event from "./Event.jsx";

<<<<<<< HEAD
const EventList = ({ events }) => {
  return (
    <div className="eventList">
      {events.map(event => {
        return <Event key={event.id} event={event} />;
=======
//This is an container to show event listing.
//TODO: add styling

const EventList = ({ events, openChat, handleIconClick, listItems, listItemSelected, handleXIconOnEventClick}) => {
  return (
    <div className="eventList">
      {events.map(event => {
        return <Event key={event.id} event={event} openChat={openChat} handleIconClick={handleIconClick} listItems={listItems} listItemSelected={listItemSelected}   handleXIconOnEventClick={handleXIconOnEventClick}/>;
>>>>>>> feature/mylist
      })}
    </div>
  );
};

export default EventList;
