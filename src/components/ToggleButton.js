import './ToggleButton.css'
import React from 'react';

const ToggleButton = (props) => {
  return (
    <button className={`btnTodo ${!props.isCompleteScreen && 'active'}`} onClick={()=>props.setIsCompleteScreen(props.bool)}>{props.btnName}</button>
    
  );
};

export default ToggleButton;



