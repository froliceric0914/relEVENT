import React from "react";

const ListItem = ({ listItem, handleListItemClick }) => {
  // expensive way??
  // test(){
  //   return fetch(
  //   `https://www.eventbriteapi.com/v3/events/51666654354/?token=${process.env.TOKEN}`
  //   )
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //        return  data;
  //   });
  // }

  let eventId = listItem.event.external_event_id;
  let likeClass = "far fa-heart";
  if (listItem.liked) {
    likeClass = "fas fa-heart";
  }

  return (
    //horizontal layout
    <div
      className="listItem img-thumbnail"
      data-id={eventId}
      onClick={handleListItemClick}
    >
      <div className="row">
        <div className="col-md-5 list-img">
          <img
            className="img-fluid "
            src={listItem.event.logo_url}
            data-id={eventId}
            onClick={handleListItemClick}
          />
        </div>
        <div className="col-md-7 list-txt">
          <div
            className="event-title"
            data-id={eventId}
            onClick={handleListItemClick}
          >
            {!listItem.event.name
              ? ""
              : listItem.event.name.substring(25)
              ? listItem.event.name.substring(0, 25) + "..."
              : listItem.event.name}
          </div>
          <i className={likeClass} />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
