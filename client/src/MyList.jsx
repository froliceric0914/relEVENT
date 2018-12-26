import React from "react";
import ListItem from './ListItem.jsx';

//This is an event info pane for an event.
//TODO: add other values. img, description, venue, cost etc...
//TODO: add onclick to chat button. show chat component
//TODO: add styling

const MyList = ({ listItems }) => {
  
  return (

    <div className="myList">
     <h3>my event list</h3>
    {listItems.length? 
    listItems.map((listItem,id) => {
      if (listItem.bookmarked){
        return <ListItem  key={id} listItem={listItem} />;
      }

    }):<div> You don't have any items yet.</div>}

    </div>
  );
};

export default MyList;
