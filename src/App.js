import React,{useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import AddButton from './components/AddButton';
import InputBox from './components/InputBox';
import ToggleButton from './components/ToggleButton';


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newInputBox, setnewInputBox] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [completedTodos, SetCompletedTodos] = useState([]);

  const handleAddTodo = ()=>{
    const newTodoItem = {
      title:newInputBox,
      description:newDescription
    }

    //let updatedTodoArr = [...allTodos];
    //updatedTodoArr.push(newTodoItem);
    setTodos((previous)=>[...previous, newTodoItem]);

    localStorage.setItem('todolist',JSON.stringify(allTodos))
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
  
  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd+'-'+mm+'-'+yy+'-'+' at '+h+':'+m+':'+'s';

  

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompleteArr = [...completedTodos];
      updatedCompleteArr.push(filteredItem);
      SetCompletedTodos(updatedCompleteArr);
      handleDeleteTodo(index)
  }

  useEffect(() =>{
    let savetodo = JSON.parse(localStorage.getItem('todolist'));
    if(savetodo){
      setTodos(savetodo);
    }
  },[])
       
  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className = "todo-wrapper">
        <div className = "todo-input">
          <InputBox text="Title" newInputBox={newInputBox} setnewInputBox={setnewInputBox} placeholder="Give Task title"/>
          <InputBox text="Description" newInputBox={newDescription} setnewInputBox={setnewDescription} placeholder="Give task description"/>
          <AddButton handleAddTodo={handleAddTodo} />

        </div>

        <div className="btn-area">
          <ToggleButton isCompleteScreen={isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} bool={false} btnName="Todo" />
          <ToggleButton isCompleteScreen={!isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} bool={true} btnName="Completed" />
        </div>
        
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3> 
                  <p>{item.description}</p>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon-dlt' onClick={()=>handleDeleteTodo(index)}/>
                  <BsCheckLg className='icon-check' onClick={()=>handleComplete(index)}/>
                </div> 
              </div>
                
            )
          })} 

          {isCompleteScreen===true && completedTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On:{item.completedOn}</small></p>
                </div>
            
                <div>
                  <AiOutlineDelete className='icon-dlt' onClick={()=>handleDeleteTodo(index)}/>
                  
                </div> 
              </div>
                
            )
          })}

        </div>


      </div>
      
    </div>
  );
}

export default App;
