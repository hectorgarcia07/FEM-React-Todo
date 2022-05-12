import { v4 as uuidv4 } from "uuid"; //used to give Note a unique identifier

import { createSlice } from "@reduxjs/toolkit"

//will get the todo from local storage
const initialState = JSON.parse(localStorage.getItem("todos") ?? "[]")

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
    clearCompleted (state, action) {
      return state.filter(todo => !todo.checked )
    }
  }
})

export const { toggleChecked, addNewTodo, deleteTodo, clearCompleted } = todoSlice.actions
export default todoSlice.reducer