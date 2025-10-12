import { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
uuidv4();
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const ToggleFinished=(e)=>{
    setShowFinished(!showFinished)
  }
  useEffect(() => {
    const todoString=localStorage.getItem("todos");
    if(todoString){
    setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    
  };

  return (
    <>
      <Navbar />
      <div className="container w-[80vh] min-h-[80vh] bg-[#dad7cd] rounded-2xl mx-auto my-10 text-center space-y-2">
        <h1 className="text-xl font-bold text-[#344e41] ">Your Todo</h1>
        <div className="addTodo flex flex-col  justify-center items-center m-2">
          <input
            className="border-[0.5px] border-[#fefae0] outline-none m-2 w-[80%] rounded-full "
            value={todo}
            type="text"
            placeholder="Add your task"
            onChange={handleChange}
          />
          
          <button
            className="bg-[#3a5a40] w-[80%] px-3 py-2 rounded-full hover:bg-[#344e41] hover:font-bold hover:cursor-pointer mx-3"
            onClick={handleAdd} disabled={todo.length<3}
          >
            Save
          </button>
        </div>
        <input onChange={ToggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold text-[#344e41] m-2">
          Tasks for the Day
        </h2>
        <div className="todos m-2">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) &&
              <div
                key={item.id}
                className="todo flex w-3/4 justify-between my-4 ml-10"
              >
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons flex h-full">
                  <button
                    className="bg-[#3a5a40] px-5 mx-2 py-3 rounded-2xl hover:bg-[#344e41] hover:font-bold hover:cursor-pointer"
                    onClick={(e) => handleEdit(e, item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-[#3a5a40] px-5 py-3 rounded-2xl hover:bg-[#344e41] hover:font-bold hover:cursor-pointer "
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                   <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
