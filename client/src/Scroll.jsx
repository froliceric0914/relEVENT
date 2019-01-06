import React from "react";

const Scroll = ( props ) => {
  
  return (   
    <div className="scroll" id={props.idName} style ={{overflowY: 'auto', overflowX: 'hidden', height: props.height, width: props.width, minWidth: props.minWidth, maxWidth: props.maxHeight, marginTop: props.marginTop }}> 
       {props.children}
    </div>
  );
};

export default Scroll;
