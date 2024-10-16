import React, { useRef, useState, useEffect } from 'react'

const TodoList = (props) => {
  const [editIndex, seteditIndex] = useState(null);
  const [showFinished, setshowFinished] = useState(false);
  const indexRefs = useRef([]);

  const toggleFinished = () => {
    setshowFinished(!showFinished);    //show all todos including finished
  }

  const handleEdit = (index) => {        //sets index of the todo that needs to be edited
    seteditIndex(index);
  }

  useEffect(() => {
    if (editIndex != null) {
      indexRefs.current[editIndex].focus();   //focuses input tag of todo that needs to be edited
    }
  }, [editIndex])

  const handleDelete = (index) => {            //stores old todos in new array, deletes the required todo in the new array then overwites old todos with new
    const newtodos = [...(props.todos)];
    newtodos.splice(index, 1);
    props.settodos(newtodos);
    console.log("deleted");
  }

  const handleCheck = (index) => {         //toggles isCompleted property of each todo when input checked
    const newtodos = [...props.todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    props.settodos(newtodos);
  }

  const handleChange = (index, e) => {     //stores edited todo in original todos
    const newtodos = [...props.todos];
    newtodos[index].todo = e.target.value;
    props.settodos(newtodos);
  }

  const handleSubmit = (e) => {         //submits edited todo input data, such that it doesn't refresh the page and editindex is set to null, to hide input box
    e.preventDefault();
    seteditIndex(null);
  }


  return (
    <div className='todoList bg-orange-200 w-3/4 rounded-[40px] overflow-y-scroll flex flex-col text-gray-700 pb-4 min-h-[70%] max-h-[70%]'>
      <div className='text-gray-700 font-bold text-2xl w-full sticky top-0 text-center py-2 backdrop-blur-sm'>My Todos</div>
      <div className='flex justify-center gap-3'>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <div>Show All</div>
      </div>
      {props.todos.length === 0 && <div className='text-gray-700 text-center font-light text-sm'>No todos to show</div>}
      {props.todos.map((item, index) => {
        return ((showFinished) || (!item.isCompleted)) && <div key={index} className='flex flex-col'>
          <div className='text-gray-700 text-lg p-4 flex justify-between overflow-x-hidden w-full max-md:text-sm gap-4'>
            <input onChange={() => { handleCheck(index) }} checked={props.todos[index].isCompleted} type="checkbox" name="check" />
            <form onSubmit={(e) => { handleSubmit(e) }} className={`w-3/5 ${editIndex === index ? "inline-block" : "hidden"}`}>
              <input onChange={(e) => { handleChange(index, e) }} type="text" className="bg-transparent w-full" value={item.todo} ref={(el) => { indexRefs.current[index] = el }} />
            </form>
            <div className={`break-words w-3/5 ${item.isCompleted ? "line-through" : ""} ${editIndex === index ? "hidden" : "inline-block"}`}>{item.todo}</div>
            <div className="btns flex gap-2 items-center max-md:flex-col">
              <div onClick={(e) => { handleEdit(index) }} className='editbtn text-white bg-gray-700 font-bold w-1/2 h-[28px] text-center rounded-full px-4 cursor-pointer flex items-center hover:bg-gray-500 max-md:h-6 max-md:w-fit'>Edit</div>
              <div onClick={() => { handleDelete(index) }} className='deletebtn text-white bg-gray-700 font-bold w-1/2 h-[28px] text-center rounded-full px-4 cursor-pointer flex items-center hover:bg-gray-500 max-md:h-6 max-md:w-fit'>Delete</div>
            </div>
          </div>
          <hr className='border-black mx-24 max-md:mx-10' />
        </div>
      })}
    </div> 
  )
}

export default TodoList;