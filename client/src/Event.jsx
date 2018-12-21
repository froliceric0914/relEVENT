import React from "react";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const Event = ({ event, openChat}) => {
  let img;
  if (event.logo && event.logo.url) {
    img = <img className="img-fluid mb-2" src={event.logo.url} />;
  } else {
    img = <div />;
  }

  return (
    // <div className='eventPanel'>
    //   <div >
    //   {event.name.text}
    //   </div>

    //   <button>chat</button>&nbsp;
    //   <button>add to list</button>
    // </div><div class="col-md-4 mt-4">

    <div className="card">
      <div className="card-body">{img}</div>

      <div className="card-body">
        <div className="card-text">
          <h2 className="text-center card-title">
            ${event.name.text.substring(0, 35)}...
          </h2>
          <p className="lead text-info">Event Information:</p>
          <p>${event.description.text ? event.description.text.substring(0, 200) : ""}...</p>

          <span className="badge badge-secondary">
            Date & Time: {event.start.local}
          </span>

          <span className="badge badge-secondary">
            {/* Location: ${event.venue.address.address_1} */}
          </span>

          <a
            href={event.url}
            target="_blank"
            className="btn btn-primary btn-block mt-4"
          >
            Get Tickets
          </a>
          <button
          name={event.id}
            onClick={openChat}
            target="_blank"
            className="btn btn-danger btn-block mt-4"
          > Chat About It!</button>

        </div>
      </div>
    </div>
  );
};

export default Event;
