import { toggleChecked, deleteTodo } from "../reducers/todoReducer"
import { useDispatch } from "react-redux"

//will be used to render all individual todos
const Note = ({ description, id, checked }) => {
  const dispatch = useDispatch()
  return (
    <>
      <label className="todo-label">
        <input 
          type="checkbox" 
          data-id={id} 
          checked={checked} 
          onChange={ () => dispatch(toggleChecked(id)) }
        />
        <p className={`todo-description ${checked ? 'todo-compleated' : ''}`} >
          { description }
        </p>
      </label>
      <button 
        className="cross-svg" 
        data-id={id} 
        onClick={() => dispatch(deleteTodo( id ))}
      ></button>
    </>
  )
}

export default Note