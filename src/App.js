import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier
import { useEffect, useState, useReducer } from 'react'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'
import TodoFilter from "./components/TodoFilter";

import TODO_ACTIONS from "./utils/todo-actions";

function App() {
  const [ filteredTodo, setFilteredTodo ] = useState([])
  const [ todoList, todoDispatch ] = useReducer(todoReducer, [])
  const [ filter, setFilter ] = useState('all')
  const [ todosLeft, setTodosLeft ] = useState(0)

  //will be used to initially set theme based on user system setting
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]

    //checks the theme on the OS level and switches theme accordingly
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? "dark" : "light";
      html.dataset.theme = newColorScheme === 'dark' ? 'dark-theme' : 'light-theme'
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.dataset.theme = 'dark-theme'
    }else{
      html.dataset.theme = 'light-theme'
    }
  }, [])

  //will be used to initially get the ToDO's saved on local storage
  //and save it as a state
  useEffect(() => {
    //if a todo array doesn't exist, create one
    if(!localStorage.getItem('todos')){
      localStorage.setItem("todos", JSON.stringify([]))
    }

    const todos = JSON.parse(localStorage.getItem('todos'))

    //update the state
    setFilteredTodo(todos)
    setTodosLeft(countTodosLeft(todos))
    todoDispatch({ type: TODO_ACTIONS.INIT, payload: todos }) //initialize todos for filter state
  }, [])

  //update the filtered todo list if todoList chanages or if filter
  //is changed
  useEffect(() => {
    function getFilteredTodo(todoState) {
      if(filter === 'active'){
        return todoState.filter(todo => !todo.checked )
      }
      else if(filter === 'completed'){
        return todoState.filter(todo => todo.checked)
      }
      return todoState
    }
    
    setTodosLeft(countTodosLeft(todoList))
    setFilteredTodo(getFilteredTodo(todoList))
  }, [filter, todoList])

  /*
    Will udpate state based on actions:
    1. if it is INIT, then initialize the filterTodos with all the todos
  */
  function todoReducer(state, action){
    switch(action.type){
      case TODO_ACTIONS.INIT:
        return action.payload
      case TODO_ACTIONS.TOGGLE_COMPLETE:
        return toggleChecked(action.payload.id, state)
      case TODO_ACTIONS.ADD_TODO:
        return addNewTodo(action.payload.todoInfo, state)
      case TODO_ACTIONS.DELETE_TODO:
        return deleteTodo(action.payload.id, state)
      case TODO_ACTIONS.CLEAR_COMPLETED:
        return clearCompleted(state)
      case TODO_ACTIONS.UPDATE_FILTER:
        setFilter(action.payload.filter)
        return state
      case TODO_ACTIONS.SWAP_VALUES:
        return swapTodoItems(state, action.payload)
      default:
        break
    }
  }

  function swapTodoItems(state, { id_one, id_two }){
    const todoCopy = [...state]
    let index_one, index_two;
    let todo_obj_one, todo_obj_two
    
    for(let i = 0, count = 0, length = state.length; i < length && count < 2; i++){
      if(id_one === todoCopy[i].id){
        index_one = i
        count++
      }
      else if(id_two === todoCopy[i].id){
        index_two = i
        count++
      }
    }

    todo_obj_one = { ...state[index_one] }
    todo_obj_two = { ...state[index_two] }
   
    todoCopy[index_one] = todo_obj_two
    todoCopy[index_two] = todo_obj_one

    localStorage.setItem('todos', JSON.stringify(todoCopy))
    
    return todoCopy
  }

  //will return the number of todos left
  function countTodosLeft(todoState) {
    return todoState.reduce((total, todo) => {
      if(!todo.checked){
        return total + 1
      }
      return total
    } , 0)
  }

  //will create a new todo, save it in localstorage and update the state
  function addNewTodo (description, todoState) {
    const id = uuidv4() //gives it a unique ID
    const newTodo = { checked: false, description, id }

    //Appends and returns new array with the new todo item
    //and saves to local storage
    const updatedTodo = todoState.concat(newTodo)
    localStorage.setItem('todos', JSON.stringify(updatedTodo))

    return updatedTodo
  }

  //will be used toggle the checked state of a Note component
  function toggleChecked(id, todoState) {
    //updates the new toggle state of the checked todo
    const updatedTodoList = todoState.map(todo => {
      //if ID matches, toggle the checked state
      if(todo.id === id){
        const updatedTodo = {
          ...todo,
          checked: !todo.checked
        }
        return updatedTodo
      }
      return todo
    })

    localStorage.setItem('todos', JSON.stringify(updatedTodoList))
    return updatedTodoList
  }

  //will be used to delete a specific todo
  function deleteTodo(id, state){
    const updatedTodoList = state.filter(todo => todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(updatedTodoList))

    return updatedTodoList
  }

  //will eliminate all todo's that have been checked
  function clearCompleted (todoState) {
    const updatedTodo = todoState.filter(todo => !todo.checked )
    localStorage.setItem('todos', JSON.stringify(updatedTodo))

    return updatedTodo
  }

  //will save the new re ordered Todos on local storage and
  //update the state
  const handleReorder = (updatedTodoOrder) => {
    let source_id = ''
    let target_id = ''

    //will find the two items that were swaped and will update their positions
    for(let i = 0, count = 0, length = filteredTodo.length; i < length && count < 2; i++){
      if(count === 0 && updatedTodoOrder[i].id !== filteredTodo[i].id){
        count++
        source_id = updatedTodoOrder[i].id
      }
      else if(count === 1 && updatedTodoOrder[i].id !== filteredTodo[i].id){
        count++
        target_id = updatedTodoOrder[i].id
      }
    }
    todoDispatch({ 
      type: TODO_ACTIONS.SWAP_VALUES, 
      payload: { id_one: source_id, id_two: target_id}
    })
  }

  return (
    <main className="container">
      <div className='background-container'>
        <div className="header-container width-container">
          <Header />
          <NoteForm todoDispatch={todoDispatch} />
          <TodoList
            todoList={ filteredTodo }
            filter={filter}
            handleReorder={handleReorder}
            todoDispatch={todoDispatch}
            todosLeft={todosLeft}
            setFilter={setFilter}
          />
          <TodoFilter 
            todosLeft={ todosLeft } 
            filter={filter}
            todoDispatch={todoDispatch}
            setFilter={setFilter}
          />
        </div>
        <p className="todo-info">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
