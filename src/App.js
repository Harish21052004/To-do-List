import { useEffect, useState } from 'react';
import './App.css';

const getLocalItems = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
}

function App() {
  const [todos, setTodos] = useState(getLocalItems())
  const [todo, setTodo] = useState("")
  const [err, setErr] = useState("")

  const addTodo = (e) =>{
    e.preventDefault()
    if(todo.trim() === ""){
      setErr("Input is empty")
      return
    }
    setErr("")
    setTodos([...todos,todo])
    setTodo('')
  }


  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(todos))
  },[todos])

  const deleteTodo = (index) =>{
    const newTodo = [...todos]
    newTodo.splice(index,1)
    setTodos(newTodo)
  }
  return (
    <div className="App">
      <div className='container'>
        <div className='input-field'>
          <form onSubmit={addTodo}>
          <input type="text" placeholder='Type your Todo Task' value={todo} onChange={(e)=> {setTodo(e.target.value)}} />
          <button type='submit' >Add Task</button>
          </form>
          <div style={{color: "red", fontSize: "10px", marginTop: "5px"}}>{err}</div>
        </div>
        <div className='task-list'>
          <ul>
            {
              todos.map((todo, index) => (
                <li key={index}>
                <p>{todo}</p>
                <div className='button'>
                  <button onClick={()=>deleteTodo(index)}>Delete</button>
                </div>
              </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;