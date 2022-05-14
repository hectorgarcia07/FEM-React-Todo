import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoReducer'

const store = configureStore({
  reducer: {
    todoList: todoReducer
  }
})

export default store