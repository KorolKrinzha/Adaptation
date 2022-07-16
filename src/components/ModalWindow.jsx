import React from "react";
 
const ModalWindow = props => {
  return (
    <div className="ModalWindow-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default ModalWindow;