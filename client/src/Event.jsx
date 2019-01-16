import React from "react";
import * as ReactBootstrap from "react-bootstrap";

const _clickHandler = e => {
  $(e.target.parentElement.parentElement.parentElement).toggleClass(
    "flip-action"
  );
  console.log("clicked");
};

const _clickHandler2 = e => {
  $(e.target.parentElement.parentElement).toggleClass("flip-action");
  console.log("click", e.target.parentElement.parentElement.parentElement);
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
        className="img-fluid"
        src={event.logo.url}
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      />
    );
    img_url = event.logo.url;
  } else {
    img = (
      <img
        className="img-fluid"
        style={{
          backgroundColor: "#ddd",
          width: "600px",
          height: "200px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px"
        }}
      />
    );
  }

  let likeIcon = "false";
  let bookmarkIcon = "false";
  let likeclassName = "far fa-heart icon";
  let bookmarkclassName = "fas fa-plus-circle icon";
  let likeCount = 0;

  for (let item of allEvents) {
    if (event.id === item.external_event_id) {
      likeCount = item.like_count;
      break;
    }
  }

  listItems.forEach(item => {
    if (event.id === item.event.external_event_id) {
      likeIcon = item.liked;
      bookmarkIcon = item.bookmarked;
      if (likeIcon === true) {
        likeclassName = "fas fa-heart icon";
      }
      if (bookmarkIcon === true) {
        bookmarkclassName = "fas fa-plus-circle icon red-plus";
      }
    }
  });

  let date;
  let longDate;
  let properDate;
  if (event.start.local) {
    date = event.start.local.toString();
    longDate = new Date(date);
    properDate = longDate.toString().substring(0, 10);
  }

  let errorMessage = `iconSideError ${event.id}`;

  let chatButtonText = !listItemSelected ? "Chat" : "Close";
  return (
    <div
      className="card m-5 flip-card"
      style={{ width: "40rem", height: "32rem" }}
    >
      <div className="flip-card-inner hoverable">
        <div className="flip-card-front">
          <div
            className="card-img-top"
            className="event-card-body pb-10"
            style={{ overflow: "hidden" }}
            alt="Card image cap"
            onClick={_clickHandler}
          >
            {img}
          </div>
          <div className="card-body">
            <div className="title-date-location">
              <h2
                className="card-title text-left"
                style={{
                  fontWeight: "600",
                  height: "4.8rem",
                  overflow: "hidden"
                }}
              >
                {!event.name.text
                  ? ""
                  : event.name.text.substring(40)
                  ? event.name.text.substring(0, 40) + " ..."
                  : event.name.text}
              </h2>
              <h3 className="card-text text-left">{properDate}</h3>
              <h3 className="card-text text-left">
                {event.venue.address.address_1
                  ? event.venue.address.address_1.substring(0, 25)
                  : ""}
              </h3>
            </div>

            <a
              className="btn btn-primary detailsButton text-white"
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
            </div>
            <div className={errorMessage} />
            <button
              className="chatButton btn btn-danger btn-block mt-4"
              name={event.id}
              data-event-name={event.name.text}
              data-img-url={img_url}
              onClick={listItemSelected ? handleXIconOnEventClick : openChat}
              target="_blank"
              style={{ backgroundColor: listItemSelected ? "#ff9933" : "" }}
            >
              {chatButtonText}
            </button>
          </div>
        </div>
        <div className="flip-card-back">
          <div
            className="card-img-top"
            className="event-card-body"
            style={{ overflow: "hidden", zIndex: "2", height: "10rem" }}
            onClick={_clickHandler}
            alt="Card image cap"
          >
            {img}
          </div>
          <p className="event-description shadow-sm p-3 rounded">
            {!event.description.text
              ? ""
              : event.description.text.substring(290)
              ? event.description.text.substring(0, 290) + "..."
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

          <button
            className="btn btn-primary backButton"
            onClick={_clickHandler2}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
