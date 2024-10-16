import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import "./index.css"
import InputBar from './components/InputBar'
import TodoList from './components/TodoList'

function App() {
  const [todo, settodo] = useState("");             //stores input from the user
  const [todos, settodos] = useState(()=>{          //stores all the todos in a array
    const setData = localStorage.getItem("todos");  //loads saved data from local storage and stores it in todos, such that even if app is closed data is saved
    return setData?JSON.parse(setData):[];
  });
  const inputElement = useRef();

  const handleAdd = () => {           //adds todo(user input) to todos array to list
    console.log("added");
    if (todo == "") {
      alert("todo cannot be empty");
    }
    else {
      settodos([...todos, { todo: todo, isCompleted: false }]);  //adds new todo to existing todos array
      settodo("");       //empty input field after todo is added
    }
  }

  useEffect(() => {
    console.log("saving to local storage");                 
    localStorage.setItem("todos", JSON.stringify(todos));  //stores data to local storage whenever there is change in todos array
  }, [todos])

  return (
    <>
      <div className="container min-w-full min-h-full w-full h-full flex flex-col">
        <Navbar />
        <div className="content flex flex-col items-center gap-8 pt-8 pb-14 h-full">
          <InputBar addbtn={handleAdd} ref={inputElement} todo={todo} settodo={settodo} />
          <TodoList todos={todos} settodos={settodos} />
        </div>
      </div>
    </>
  )
}

export default App;
