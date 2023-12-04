import './AddButton.css'
import React from 'react';

const AddButton = (props) => {
  return (
    <div className="todo-input-item">
      <button type="button" onClick={props.handleAddTodo} className="btnAdd">Add</button>
    </div>
  );
};

export default AddButton;
