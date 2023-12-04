import './InputBox.css'
import React from 'react'; 


const InputBox = (props) => {
  return (
    <div className="todo-input-item">
      <label>{props.text}</label>
      <input type="text" value={props.newInputBox} onChange={(e)=>props.setnewInputBox(e.target.value)} placeholder={props.placeholder} />
    </div>
  );
};

export default InputBox;




