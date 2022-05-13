import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { getFilteredTodoList } from './reducers/todoReducer'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'
import TodoFilter from "./components/TodoFilter";

function App() {
  const dispatch = useDispatch()
  const todoList = useSelector( state => state.todos )
  const filteredTodo = dispatch( getFilteredTodoList() )

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
/* 
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
 */

  const getTodosLeft = () => {
    return todoList.reduce((total, todo) => {
      if(!todo.checked){
        return total + 1
      }
      return total
    } , 0)
  }

  const handleReorder = ( state ) => {
    return state
  }
  return (
    <main className="container">
      <div className='background-container'>
        <div className="header-container width-container">
          <Header />
          <NoteForm />
          <TodoList
            todoList={ filteredTodo }
            handleReorder={handleReorder}
          />
          <TodoFilter 
            todosLeft={ getTodosLeft( todoList ) } 
          />
        </div>
        <p className="todo-info">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
