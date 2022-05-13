import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier

import { createSlice , current} from "@reduxjs/toolkit"

//will get the todo from local storage
const initialState = {
  todoList: JSON.parse(localStorage.getItem("todos") ?? "[]"),
  todoFilter: 'ALL'
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    //will be used toggle the checked state of given todo with matching ID
    toggleChecked(state, action){
      //updates the new toggle state of the checked todo
      const updatedTodoList = state.map(todo => {
        //if ID matches, toggle the checked state
        if(todo.id === action.payload){
          return { ...todo, checked: !todo.checked }
        }
        return todo
      })

      return updatedTodoList
    },
    //will create a new todo, save it in localstorage and update the state
    addNewTodo(state, action){
      const id = uuidv4() //gives it a unique ID
      const newTodo = { 
        checked: false, 
        description: action.payload, 
        id
      }

      //Adds a new todo item
      state.push(newTodo)
    },
    //will be used to delete todo with given ID
    deleteTodo(state, action){
      return state.filter(todo => todo.id !== action.payload)
    },
    //will eliminate all todo's that have been checked
    clearCompleted(state, action) {
      return state.filter(todo => !todo.checked )
    }, 
    //will update the filter of the todo
    updateTodoFilter(state, action){
      return { ...state, todoFilter: action.payload }
    },
    //will get the filterd todo list
    getFilteredTodoList(state, action){
      console.log(current(state.todoList))
      if( state.todoFilter === 'ALL'){
        return state.todoList
      }
      else if(state.todoFilter === 'COMPLETED'){
        return state.todoList.filter( todo => todo.checked )
      }
      return state.todoList.filter( todo => !todo.checked )
    }
  }
})

export const { 
  toggleChecked,
  addNewTodo, 
  deleteTodo, 
  clearCompleted,
  updateTodoFilter,
  getFilteredTodoList } = todoSlice.actions
export default todoSlice.reducer