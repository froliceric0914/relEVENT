import React from "react";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const Event = ({ event }) => {
  // console.log("events component: ", event.name);
  let img;
  if (event && event.logo_url) {
    img = <img className="img-fluid mb-2" src={event.logo_url} />;
  } else {
    img = <div />;
  }

  return (
    <div className="card">
      <div className="card-body">{img}</div>

      <div className="card-body">
        <div className="card-text">
          <h2 className="text-center card-title">
            {event.name.substring(0, 35)}...
          </h2>

          <p className="lead text-info">Event Information:</p>
          <p>{event.description.substring(0, 200)}...</p>

          <span className="badge badge-secondary">
            Date & Time: {event.start_local}
          </span>
          <span className="badge badge-secondary">
            Location_address: {event.venue_address}
          </span>
          <a
            href={event.event_url}
            target="_blank"
            className="btn btn-primary btn-block mt-4"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default Event;
