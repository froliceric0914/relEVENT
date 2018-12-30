import React from "react";

const Scroll = ( props ) => {
  
  return (   
    <div className="scroll" style ={{overflowY: 'auto', height: props.height, width: props.width, minWidth: props.minWidth}}> 
       {props.children}
    </div>
  );
};

export default Scroll;
