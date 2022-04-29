import TODO_ACTIONS from "../utils/todo-actions"

//will be used to render all individual todos
const Note = ({ description, id, checked, todoDispatch }) => {
  return (
    <>
      <label className="todo-label">
        <input 
          type="checkbox" 
          data-id={id} 
          checked={checked} 
          onChange={() => todoDispatch({ type: TODO_ACTIONS.TOGGLE_COMPLETE, payload: { id } })}
        />
        <p className={`todo-description ${checked ? 'todo-compleated' : ''}`} >
          { description }
        </p>
      </label>
      <button 
        className="cross-svg" 
        data-id={id} 
        onClick={() => todoDispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: { id } })}
      ></button>
    </>
  )
}

export default Note