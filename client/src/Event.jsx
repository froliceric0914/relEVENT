import React from "react";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const Event = ({ event, openChat, handleIconClick}) => {
  let img;
  // console.log("event", event);
  if (event.logo && event.logo.url) {
    img = <img className="img-fluid mb-2" src={event.logo.url} />;
  } else {
    img = <div />;
  }

  return (

    <div className="card">
      <div className="card-body">{img}</div>

      <div className="card-body">
        <div className="card-text">
          <h2 className="text-center card-title">
            {event.name.text.substring(0, 35)}...
          </h2>
          <p className="lead text-info">Event Information:</p>
          <p>{event.description.text ? event.description.text.substring(0, 200) : ""}...</p>

          <span className="badge badge-secondary">
            Date & Time: {event.start.local}
          </span>
          <br />
          <span className="badge badge-secondary">
            Location: {event.venue.address.address_1}
          </span>handleIconClick

          <div className="icons">
            <i className="far fa-heart" onClick={ handleIconClick }>0</i> &nbsp;
            <i className="far fa-bookmark" onClick={ handleIconClick }></i>
          </div>

          <a
            href={event.url}
            target="_blank"
            className="btn btn-primary btn-block mt-4"
          >
            More 
          </a>

          <button className="chatButton"
          name={event.id}
            onClick={openChat}
            target="_blank"
            className="btn btn-danger btn-block mt-4"
          >Chat</button>

        </div>
      </div>
    </div>
  );
};

export default Event;
