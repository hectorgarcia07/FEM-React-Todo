import { useState } from "react"

import { addNewTodo } from "../reducers/todoReducer"
import { useDispatch } from "react-redux"

import { NoteFormStyle } from "./styles/NoteForm.styled"

//this component will save the state of the form and will
//send it to the app component to add and create a new state
const NoteForm = () => {
  const dispatch = useDispatch()

  const [ todoInfo, setTodoInfo ] = useState('')

  const updateTodoInfo = (e) => {
    setTodoInfo( e.target.value )
  }

  const createTodoNode = (e) => {
    e.preventDefault()

    const filteredTodoInfo = todoInfo.trim()

    //create new todo if todoInfo is not empty
    if( filteredTodoInfo.length > 0 ){
      dispatch(addNewTodo(filteredTodoInfo))
      setTodoInfo('')
    }
  }

  return (
    <NoteFormStyle onSubmit={createTodoNode}>
      <button
        id="create-todo" 
        className="svg-plus-btn" 
        type="submit"
      ></button>
      <input 
        id="todo-input-form" 
        className="input-note" 
        type="text" 
        name="newNote" 
        placeholder="Create a new todo..." 
        value={todoInfo}
        onChange={updateTodoInfo}
      />
  </NoteFormStyle>
  )
}

export default NoteForm