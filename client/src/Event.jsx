import React from "react";
import * as ReactBootstrap from "react-bootstrap";

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

  if (event.logo && event.logo.url) {
    img = <img classNameName="img-fluid mb-2" src={event.logo.url} />;
    img_url = event.logo.url;
  } else {
    img = <div />;
    img_url = "";
  }

  let likeIcon = "false";
  let bookmarkIcon = "false";
  let likeclassName = "far fa-heart icon";
  let bookmarkclassName = "far fa-bookmark icon";
  let likeCount = 0;

  allEvents.forEach(item => {
    if (event.id === item.external_event_id) {
      likeCount = item.like_count;
    }
  });

  listItems.forEach(item => {
    if (event.id === item.event.external_event_id) {
      likeIcon = item.liked;
      bookmarkIcon = item.bookmarked;
      if (likeIcon === true) {
        likeclassName = "fas fa-heart icon";
      }
      if (bookmarkIcon === true) {
        bookmarkclassName = "fas fa-bookmark icon";
      }
    }
  });

  // if item was selected from a list, show close icon to back to search
  let xIcon;
  if (listItemSelected) {
    xIcon = (
      <div
        classNameName="closeX right"
        name="back to search result"
        onClick={handleXIconOnEventClick}
      >
        x
      </div>
    );
    {
      /* <i id="closeX" classNameName="fas fa-times fa-2x" onClick={this.closeChat}></i> */
    }
  }

  return (
    <div classNameName="event-card col-6">
      <div className="card m-5" style={{ width: "40rem", height: "40rem" }}>
        <div
          className="card-img-top"
          classNameName="event-card-body"
          alt="Card image cap"
        >
          {img}
        </div>
        <div className="card-body">
          

          <div className="container">
            <div class="row">
              
            </div>
          
          </div>


          <h3 className="card-title">
            {event.name.text.substring(35)
              ? event.name.text.substring(0, 35) + "..."
              : event.name.text}
          </h3>
          <span classNameName="badge badge-secondary">
            Date & Time: {event.start.local}{" "}
          </span>
          <br />{" "}
          <span classNameName="badge badge-secondary">
            Location: {event.venue.address.address_1}{" "}
          </span>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Description
          </a>
          <div classNameName="icons">
            <i
              data-on={likeIcon}
              data-id={event.id}
              data-name="like"
              data-event-name={event.name.text}
              data-img-url={img_url}
              classNameName={likeclassName}
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
              classNameName={bookmarkclassName}
              onClick={handleIconClick}
            />
          </div>
          <div classNameName="iconSideError" />
          <div classNameName="iconSideMessage" />
          <a
            href={event.url}
            target="_blank"
            classNameName="btn btn-primary btn-block mt-4"
          >
            More
          </a>
          <button
            classNameName="chatButton btn btn-danger btn-block mt-4"
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

// <div classNameName="event-card col-6">
//   <div classNameName="event-card-body">{img}</div>
//   <div classNameName="event-card-body">
//     {xIcon}
//     <div classNameName="event-card-text">
// <h2 classNameName="text-center event-card-title">
//   {/* {event.name.text.substring(0, 35)}... */}
//   {event.name.text.substring(35)
//     ? event.name.text.substring(0, 35) + "..."
//     : event.name.text}
// </h2>
//       <p classNameName="lead text-info">Event Information:</p>
//       {/* <p>
//         {event.description.text.substring(200)
//           ? event.description.text.substring(0, 200) + "..."
//           : event.description.text}
//       </p> */}
//       <span classNameName="badge badge-secondary">
//         Date & Time: {event.start.local}
//       </span>
//       <br />
//       <span classNameName="badge badge-secondary">
//         Location: {event.venue.address.address_1}
//       </span>

// <div classNameName="icons">
//   <i
//     data-on={likeIcon}
//     data-id={event.id}
//     data-name="like"
//     data-event-name={event.name.text}
//     data-img-url={img_url}
//     classNameName={likeclassName}
//     onClick={handleIconClick}
//   />
//   <span>{likeCount}</span>
//   &nbsp;
//   <i
//     data-on={bookmarkIcon}
//     data-id={event.id}
//     data-name="bookmark"
//     data-event-name={event.name.text}
//     data-img-url={img_url}
//     classNameName={bookmarkclassName}
//     onClick={handleIconClick}
//   />
// </div>

// <div classNameName="iconSideError" />
// <div classNameName="iconSideMessage" />

// <a
//   href={event.url}
//   target="_blank"
//   classNameName="btn btn-primary btn-block mt-4"
// >
//   More
// </a>

// <button
//   classNameName="chatButton btn btn-danger btn-block mt-4"
//   name={event.id}
//   data-event-name={event.name.text}
//   data-img-url={img_url}
//   onClick={openChat}
//   target="_blank"
// >
//   Chat
// </button>
//     </div>
//   </div>
// </div>
