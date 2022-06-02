import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { updateTodoList } from './reducers/todoReducer'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'
import TodoFilter from "./components/TodoFilter";

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './components/styles/Global'
import { BackgroundContainer, ContentContainer, Footer } from './components/styles/Containers.styled'
import { light, dark } from './components/styles/Theme.styled'

import { swapTodoItems } from './helpers/swapTodoItems'

function App() {
  const dispatch = useDispatch()

  const [theme, toggleTheme ] = useState( light )
  const todoList = useSelector( state => state.todoList.todoList )
  const filterType = useSelector( state => state.todoList.filterType )
  const filteredTodo = getFilteredTodoList()

  //will be used to initially set theme based on user system setting
  useEffect(() => {
    //checks the theme on the OS level and switches theme accordingly
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? "dark" : "light";
      toggleTheme( prevTheme => newColorScheme === 'dark' ? dark : light )
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleTheme(dark)
    }else{
      toggleTheme(light)
    }
  }, [])
 
  //will be used to find the two todos that were swapped
  const handleReorder = (updatedTodoOrder) => {
    const updatedTodo = swapTodoItems( updatedTodoOrder, filteredTodo, todoList )
    dispatch( updateTodoList(updatedTodo))
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
          <Footer className="todo-info">Drag and drop to reorder list</Footer>
        </BackgroundContainer>
      </main>
    </ThemeProvider>
    
  );
}

export default App;
