import { useState } from "react"

import TODO_ACTIONS from "../utils/todo-actions"

//this component will save the state of the form and will
//send it to the app component to add and create a new state
const NoteForm = ({ todoDispatch }) => {
  const [ todoInfo, setTodoInfo ] = useState('')

  const updateTodoInfo = (e) => {
    setTodoInfo( e.target.value )
  }

  const createTodoNode = (e) => {
    e.preventDefault()

    const filteredTodoInfo = todoInfo.trim()

    //create new todo if todoInfo is not empty
    if( filteredTodoInfo.length > 0 ){
      todoDispatch({ type: TODO_ACTIONS.ADD_TODO, payload: { todoInfo } })
      setTodoInfo('')
    }
  }

  return (
    <form className="note-input" onSubmit={createTodoNode}>
      <button
        id="create-todo" 
        className="svg-plus-btn todo-btn" 
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
  </form>
  )
}

export default NoteForm