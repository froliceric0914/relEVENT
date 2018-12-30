import React from "react";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const Event = ({
  event,
  openChat,
  handleIconClick,
  listItems,
  listItemSelected,
  handleXIconOnEventClick,
  allEvents
}) => {
  let img;
  let img_url;
  // console.log("event", event);
  if (event.logo && event.logo.url) {
    img = <img className="img-fluid mb-2" src={event.logo.url} />;
    img_url = event.logo.url;
  } else {
    img = <div />;
    img_url = "";
  }

  let likeIcon = "false";
  let bookmarkIcon = "false";
  let likeClass = "far fa-heart";
  let bookmarkClass = "far fa-bookmark";
  let likeCount = 0;

  // allEvents.forEach(item=>{
  //   if (event.id === item.external_event_id) {
  //     likeCount = item.like_count;
  //     console.log("count", item.like_count)
  //   }
  // })

  listItems.forEach(item => {
    if (event.id === item.event.external_event_id) {
      likeIcon = item.liked;
      bookmarkIcon = item.bookmarked;
      if (likeIcon === true) {
        likeClass = "fas fa-heart";
      }
      if (bookmarkIcon === true) {
        bookmarkClass = "fas fa-bookmark";
      }
    }
  });

  // if item was selected from a list, show close icon to back to search
  let xIcon;
  if (listItemSelected) {
    xIcon = (
      <div
        className="closeX right"
        name="back to search result"
        onClick={handleXIconOnEventClick}
      >
        x
      </div>
    );
    {
      /* <i id="closeX" className="fas fa-times fa-2x" onClick={this.closeChat}></i> */
    }
  }

  return (
    <div className="card">
      <div className="card-body">{img}</div>
      <div className="card-body">
        {xIcon}
        <div className="card-text">
          <h2 className="text-center card-title">
            {event.name.text.substring(0, 35)}...
          </h2>
          <p className="lead text-info">Event Information:</p>
          <p>{event.description.text.substring(0, 200)}...</p>
          {/* <p>{event.description.text ? event.description.text.substring(0, 200) : ""}...</p> */}

          <span className="badge badge-secondary">
            Date & Time: {event.start.local}
          </span>
          <br />
          <span className="badge badge-secondary">
            Location: {event.venue.address.address_1}
          </span>

          <div className="icons">
            <i
              data-on={likeIcon}
              data-id={event.id}
              data-name="like"
              data-event-name={event.name.text}
              data-img-url={img_url}
              className={likeClass}
              onClick={handleIconClick}
            />
            <span>{likeCount}</span>
            &nbsp;
            <i
              data-on={bookmarkIcon}
              data-id={event.id}
              data-name="bookmark"
              data-event-name={event.name.text}
              data-img-url={img_url}
              className={bookmarkClass}
              onClick={handleIconClick}
            />
          </div>

          <div className="iconSideError" />
          <div className="iconSideMessage" />

          <a
            href={event.url}
            target="_blank"
            className="btn btn-primary btn-block mt-4"
          >
            More
          </a>

          <button
            className="chatButton btn btn-danger btn-block mt-4"
            name={event.id}
            data-event-name={event.name.text}
            data-img-url={img_url}
            onClick={openChat}
            target="_blank"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
