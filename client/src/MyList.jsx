import React from "react";
import ListItem from "./ListItem.jsx";

const MyList = ({ listItems, handleListItemClick }) => {
  return (
    <div className="myList">

      {listItems.length && listItems.some(listItem => listItem.bookmarked) ? (
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
            You don't have any items yet.
        </div>
        )}

    </div>
  );
};

export default MyList;
