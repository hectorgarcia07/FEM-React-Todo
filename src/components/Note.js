import { toggleChecked, deleteTodo } from "../reducers/todoReducer"
import { useDispatch } from "react-redux"

import { TodoLabel } from "./styles/TodoLabel.styled"
import { CrossBtn } from "./styles/Button.styled"

//will be used to render all individual todos
const Note = ({ description, id, checked }) => {
  const dispatch = useDispatch()
  return (
    <>
      <TodoLabel>
        <input 
          type="checkbox" 
          data-id={id} 
          checked={checked} 
          onChange={ () => dispatch(toggleChecked(id)) }
        />
        <p className={`todo-description ${checked ? 'todo-compleated' : ''}`} >
          { description }
        </p>
      </TodoLabel>
      <CrossBtn 
        data-id={id} 
        onClick={() => dispatch(deleteTodo( id ))}
      ></CrossBtn>
    </>
  )
}

export default Note