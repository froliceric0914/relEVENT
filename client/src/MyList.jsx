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
      
        <h3>Your event list</h3>
        {listItems.length?
        listItems.map((listItem) => {
          if (listItem.bookmarked){
            return <ListItem  key={listItem.id} listItem={listItem} handleListItemClick={handleListItemClick}/>;
          }

        }):<div className="notify"> You don't have any items yet.</div>}
<<<<<<< HEAD
      </Scroll>
=======
     
>>>>>>> 3af423909d48fa41029e06cf0ce2fba396b1e64b
    </div>

    
  );
};

export default MyList;
