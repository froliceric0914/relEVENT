import React from "react";
import ListItem from './ListItem.jsx';
import Scroll from "./Scroll.jsx";

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const MyList = ({ listItems, handleListItemClick }) => {

  return (

    <div className="myList">
      <Scroll width="100%" height="500px">
        <h3>Your event list</h3>
        {listItems.length?
        listItems.map((listItem) => {
          if (listItem.bookmarked){
            return <ListItem  key={listItem.id} listItem={listItem} handleListItemClick={handleListItemClick}/>;
          }

        }):<div className="notify"> You don't have any items yet.</div>}
      </Scroll>
    </div>
  );
};

export default MyList;
