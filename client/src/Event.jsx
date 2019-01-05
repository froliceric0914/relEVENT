import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Button, Icon } from "react-materialize";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling
const _clickHandler = e => {
  // console.log("thiddddd", e.target.parentElement.parentElement.parentElement);

  // $(e.target.parentElement.parentElement.parentElement).toggleClass("test");
  $(e.target.parentElement.parentElement.parentElement).toggleClass("test");

  // ***** come back to dry this
  // $(this)
  //   .parentsUntil($(".flip-card-inner"))
  //   .toggleClass("test");

  console.log("clicked");
};

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
    img = (
      <img
        className="img-fluid mb-2"
        src={event.logo.url}
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      />
    );
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
        className="closeX right"
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
    // <div className="event-card col-6">
    <div
      className="card m-5 flip-card"
      style={{ width: "40rem", height: "40rem" }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div
            className="card-img-top"
            className="event-card-body"
            style={{ overflow: "hidden" }}
            alt="Card image cap"
            onClick={_clickHandler}
          >
            {img}
          </div>
          <div className="card-body">
            <h3 className="card-title">
              {event.name.text.substring(35)
                ? event.name.text.substring(0, 35) + "..."
                : event.name.text}
            </h3>
            <span className="badge badge-secondary">
              Date & Time: {event.start.local}{" "}
            </span>
            <br />{" "}
            <span className="badge badge-secondary">
              Location: {event.venue.address.address_1}{" "}
            </span>
            <p className="card-text" />
            <a
              href="#"
              className="btn btn-primary detailsButton"
              onClick={_clickHandler}
            >
              Details
            </a>
            <div className="icons">
              <i
                data-on={likeIcon}
                data-id={event.id}
                data-name="like"
                data-event-name={event.name.text}
                data-img-url={img_url}
                className={likeclassName}
                onClick={handleIconClick}
              />
              <span className="like-counter">{likeCount}</span>
              &nbsp;
              <i
                data-on={bookmarkIcon}
                data-id={event.id}
                data-name="bookmark"
                data-event-name={event.name.text}
                data-img-url={img_url}
                className={bookmarkclassName}
                onClick={handleIconClick}
              />
              <i className="fas fa-bookmark icon whiteBookmark " />
            </div>
            <div className="iconSideError" />
            <div className="iconSideMessage" />
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
        <div className="flip-card-back">
          <div
            className="card-img-top"
            className="event-card-body"
            onClick={_clickHandler}
            alt="Card image cap"
          >
            {img}
          </div>
          <p className="lead text-info">Event Information:</p>
          <p>
            {event.description.text.substring(300)
              ? event.description.text.substring(0, 300) + "..."
              : event.description.text}
          </p>
          <a
            href={event.url}
            target="_blank"
            className="btn btn-primary btn-block mt-4 more-button"
          >
            {" "}
            More
          </a>
          <a
            href="#"
            className="btn btn-primary backButton"
            onClick={_clickHandler}
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Event;
