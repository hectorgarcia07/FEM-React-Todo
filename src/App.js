import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { updateTodoList } from './reducers/todoReducer'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'
import TodoFilter from "./components/TodoFilter";

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './components/styles/Global'
import { BackgroundContainer, ContentContainer } from './components/styles/Containers.styled'
import { light, dark } from './components/styles/Theme.styled'

function App() {
  const dispatch = useDispatch()

  const [theme, toggleTheme ] = useState( light )
  const todoList = useSelector( state => state.todoList.todoList )
  const filterType = useSelector( state => state.todoList.filterType )
  const filteredTodo = getFilteredTodoList()

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

  //will be find the two obj in the TODO list that were swaped and swap them and 
  //updates their state
  function swapTodoItems({ source_id, target_id }){
    const todoCopy = [...todoList]
    let index_one, index_two;
    let todo_obj_one, todo_obj_two
    
    //find the index of source_id and target_id to be used to know where to swap them
    index_one = todoCopy.findIndex( todo => todo.id === source_id )
    index_two = todoCopy.findIndex( todo => todo.id === target_id )

    //make a copy of the two todo objects 
    todo_obj_one = { ...todoList[index_one] }
    todo_obj_two = { ...todoList[index_two] }
   
    //swap both of the todo items
    todoCopy[index_one] = todo_obj_two
    todoCopy[index_two] = todo_obj_one
    
    dispatch(updateTodoList(todoCopy))
  }
 
  //will be used to determine what two items were swaped and will get their ids
  const handleReorder = (updatedTodoOrder) => {
    let source_id, target_id = ''

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

    swapTodoItems( { source_id, target_id } )
  }

  function getFilteredTodoList(){
    if (filterType === 'ALL'){
      return todoList
    }
    else if( filterType === 'COMPLETED'){
      return todoList.filter( todo => todo.checked)
    }
    return todoList.filter( todo => !todo.checked)
  }

  function changeTheme(){
    toggleTheme( prevTheme => prevTheme.name === 'dark-theme' ? light : dark )
  }

  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle />
      <main>
        <BackgroundContainer >
          <ContentContainer >
            <Header changeTheme={changeTheme} />
            <NoteForm />
            <TodoList
              handleReorder={handleReorder}
              todoList={ filteredTodo }
            />
            <TodoFilter />
          </ContentContainer>
          <p className="todo-info">Drag and drop to reorder list</p>
        </BackgroundContainer>
      </main>
    </ThemeProvider>
    
  );
}

export default App;
