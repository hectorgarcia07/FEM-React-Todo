import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier
import { useEffect, useState, useReducer } from 'react'
import { useSelector } from "react-redux";

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

  const todos = useSelector( state => state.todos )

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
    console.log(todos)
    setFilteredTodo(todos) //by default filter is set to all so all todos are saved
    setTodosLeft(countTodosLeft(todos))//will be the number of uncompleted todos
    todoDispatch({ type: TODO_ACTIONS.INIT, payload: todos }) //initialize todos for filter state
  }, [])

  //if filter or the todoList was updated, get the new current filtered Todo's and
  //update it's state
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
    localStorage.setItem('todos', JSON.stringify(todoList))

    setTodosLeft(countTodosLeft(todoList))//get the number of todos that are unchecked
    setFilteredTodo(getFilteredTodo(todoList))
  }, [filter, todoList])

  /*
    Will udpate state based on actions:
    1. if it is INIT, then initialize the filterTodos with all the todos
    2. TOGGLE_COMPLETE will set the selected todo's completed, if not completed, or
       not completed if it was originally completed. Changes will reflet on localstorage.
    3. ADD_TODO will add a todo to the current todoList state and udpate it via localstorage
    4. DELETE_TODO will delete the todo that was selected and will update localstorage
    5. ClEAR_COMPLETE will clear all completed todos from the todoList. Will update on localstorage
    6. UPDATE_FILTER will update the filter status. IF Filter is 'all' then it will display all the 
       todos and filteredTodo state will be updated. If filter is 'active' then filteredTodo will be
       only of todos that are not checked. If filter is 'completed' then filteredTodo will be only
       of checked todos.
    7. SWAP_VALUES: when a user re-aranges a todo by clicking and draging, it will saved the two todos
       that were swaped and it's change will reflect localstorage
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

  //will be find the two obj in the TODO list that were swaped and swap them and 
  //updates their state
  function swapTodoItems(state, { id_one, id_two }){
    const todoCopy = [...state]
    let index_one, index_two;
    let todo_obj_one, todo_obj_two
    
    //find the index of id_one and id_two to be used to know where to swap them
    index_one = todoCopy.findIndex( todo => todo.id === id_one )
    index_two = todoCopy.findIndex( todo => todo.id === id_two )

    //make a copy of the two todo objects 
    todo_obj_one = { ...state[index_one] }
    todo_obj_two = { ...state[index_two] }
   
    //swap both of the todo items
    todoCopy[index_one] = todo_obj_two
    todoCopy[index_two] = todo_obj_one
    
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
    return todoState.concat(newTodo)
  }

  //will be used toggle the checked state of given todo with matching ID
  function toggleChecked(id, todoState) {
    //updates the new toggle state of the checked todo
    const updatedTodoList = todoState.map(todo => {
      //if ID matches, toggle the checked state
      if(todo.id === id){
        return { ...todo, checked: !todo.checked }
      }
      return todo
    })

    return updatedTodoList
  }

  //will be used to delete todo with given ID
  function deleteTodo(id, state){
    return state.filter(todo => todo.id !== id)
  }

  //will eliminate all todo's that have been checked
  function clearCompleted (todoState) {
    return todoState.filter(todo => !todo.checked )
  }

  //will be used to determine what two items were swaped and will get their ids
  const handleReorder = (updatedTodoOrder) => {
    let source_id = ''
    let target_id = ''

    //compares each items from the todoList and updatedTodoOrder and will figure out which
    //two items were swapped. it will saved their id's.
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
    //will be used to perform the actual swapping.
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
            handleReorder={handleReorder}
            todoDispatch={todoDispatch}
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
