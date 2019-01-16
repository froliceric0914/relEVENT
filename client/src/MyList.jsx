import React from "react";
import ListItem from "./ListItem.jsx";
import Scroll from "./Scroll.jsx";

const MyList = ({ listItems, handleListItemClick }) => {
  return (
    <div className="myList">
      {/* <Scroll> */}
      {/* <h3>Your event list</h3> */}
      {listItems.length ? (
        listItems.map(listItem => {
          if (listItem.bookmarked) {
            return (
              <ListItem
                key={listItem.id}
                listItem={listItem}
                handleListItemClick={handleListItemClick}
              />
            );
          }
        })
      ) : (
        <div className="img-thumbnail listItem notify">
          {" "}
          You don't have any items yet.
        </div>
      )}

      {/* </Scroll> */}
    </div>
  );
};

export default MyList;
