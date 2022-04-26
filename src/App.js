import './style.css'

import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier
import { useEffect, useState } from 'react'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'

function App() {
  const [ todoList, setTodoList ] = useState([])
  const [ filter, setFilter ] = useState('all')

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

  //will be used to set the todo's that is stored in localstorage
  useEffect(() => {
    //if a todo array doesn't exist, create one
    if(!localStorage.getItem('todos')){
      localStorage.setItem("todos", JSON.stringify([]))
    }

    setTodoList(JSON.parse(localStorage.getItem('todos')))
  }, [])

  console.log(todoList)

  //will create a new todo, save it in localstorage and update the state
  const addNewTodo = (description) => {
    const id = uuidv4()
    const newTodo = { checked: false, description, id }

    setTodoList( prevTodoList => prevTodoList.concat(newTodo) )
    const todos = JSON.parse(localStorage.getItem('todos'))
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  //will be used toggle the checked state of a Note component
  const toggleChecked = (id) => {
    setTodoList( prevTodoList => {
      //updates the new toggle state of the checked todo
      const updatedTodoList = prevTodoList.map(todo => {
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
    })

  }

  //will be used to delete a specific todo
  const deleteTodo = (id) => {
    setTodoList( prevTodoList => {
      const updatedTodoList = prevTodoList.filter(todo => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(updatedTodoList))

      return updatedTodoList
    })
  }

  //will be used to update the Todo's based on active, completed or all
  const updateFilter = (updatedFilter) => {
    setFilter(updatedFilter)
  }

  //will get the todo's based on the current filter that 
  //is selected
  const getTodoList = () => {
    if(filter === 'active'){
      return todoList.filter(todo => !todo.checked )
    }
    else if(filter === 'completed'){
      return todoList.filter(todo => todo.checked)
    }
    return todoList
  }

  const clearCompleted = () => {
    setTodoList(prevTodoList => {
      const updatedTodo = prevTodoList.filter(todo => !todo.checked )
      localStorage.setItem('todos', JSON.stringify(updatedTodo))
      return updatedTodo
    })
  }

  return (
    <main className="container">
      <div className='background-container'>
        <div className="header-container width-container">
          <Header />
          <NoteForm addNewTodo={ addNewTodo } />
          <TodoList
            todoList={ getTodoList() }
            toggleChecked={ toggleChecked }
            deleteTodo={ deleteTodo }
            updateFilter={ updateFilter }
            filter={filter}
            clearCompleted={clearCompleted}
          />
        </div>
        <p className="todo-info">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
