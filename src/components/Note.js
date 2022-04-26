const Note = ({ description, id, checked, toggleChecked, deleteTodo }) => {
  return (
    <li className="todo-node" draggable="true">
      <label className="todo-label">
        <input 
          type="checkbox" 
          data-id={id} 
          checked={checked} 
          onChange={() => toggleChecked(id)}
        />
        <p className={`todo-description ${checked ? 'todo-compleated' : ''}`} >
          { description }
        </p>
      </label>
      <button 
        className="cross-svg" 
        data-id={id} 
        onClick={() => deleteTodo(id)}
      ></button>
    </li>
  )
}

export default Note