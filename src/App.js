import react, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

const [todos, setTodos] = useState([])

const todoNameRef = useRef()

function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)

}

function handleAddTodo(e) {

  const name = todoNameRef.current.value

  if (name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
  })

  todoNameRef.current.value = null
}


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    const name = todoNameRef.current.value

    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
  
    todoNameRef.current.value = null
  }
}


useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function handleRemoveTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}



  


  return (
    <Row>
      <Col className="main-container">
        <Row>
          <Col className="main-content">
            <Row>
              <Col>
              <div className="main-box">
                <div>
                <div className="text-center title mb-3 py-2">Awesome Todo List</div>
                  <div className="box-content">
                  <div className="showTodos"><TodoList toggleTodo={toggleTodo} todos={todos} className="todo-wrapper" /></div>
                  <div><input ref={todoNameRef} placeholder="Type your todo" autoFocus className="input-todo mt-3" onKeyDown={handleKeyDown} /></div>
                  <div><button onClick={handleAddTodo} className="my-3 btn-add">Add Your Todo</button></div>
                  <div className="text-center">{todos.filter(todo =>  !todo.complete).length} Left to do</div>
                  </div>
                  <div className="wrapper-clear mt-3"><button onClick={handleRemoveTodos} className="btn-clear">Clear Complete</button></div>
                </div>
              </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="wrapper-footer">
          <Col className="footer">
            <div>&copy; {new Date().getFullYear()} Gootodo by <a href="https://github.com/dehyabi">dehyabi</a></div>
          </Col>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default App;
