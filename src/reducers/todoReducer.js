import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier

import { createSlice} from "@reduxjs/toolkit"

//will get the todo from local storage
const initialState = {
  todoList: JSON.parse(localStorage.getItem("todos") ?? "[]"),
  filterType: 'ALL'
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    //will be used toggle the checked state of given todo with matching ID
    toggleChecked(state, action){
      const findTodoItem = state.todoList.find( todo => todo.id === action.payload )
      //updates the new toggle state of the checked todo
      findTodoItem.checked = !findTodoItem.checked

      //save to localstorage
      localStorage.setItem('todos', JSON.stringify(state.todoList))
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
      state.todoList.unshift(newTodo)

      //save to localstorage
      localStorage.setItem('todos', JSON.stringify(state.todoList))
    },
    //will be used to delete todo with given ID
    deleteTodo(state, action){
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload)

      //save to localstorage
      localStorage.setItem('todos', JSON.stringify(state.todoList))
    },
    //will eliminate all todo's that have been checked
    clearCompleted(state, action) {
      state.todoList = state.todoList.filter(todo => !todo.checked )

      //save to localstorage
      localStorage.setItem('todos', JSON.stringify(state.todoList))

    },
    updateTodoFilter(state, action){
      state.filterType = action.payload
    },
    updateTodoList(state, action){
      state.todoList = action.payload

      //save to localstorage
      localStorage.setItem('todos', JSON.stringify(state.todoList))
    }
  }
})

export const { 
  toggleChecked,
  addNewTodo, 
  deleteTodo, 
  clearCompleted,
  updateTodoFilter,
  updateTodoList
  } = todoSlice.actions
export default todoSlice.reducer