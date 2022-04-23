const NoteForm = () => {
  return (
    <form className="note-input">
      <button 
        id="create-todo" 
        className="svg-plus-btn todo-btn" 
        type="submit"></button>
      <input 
        id="todo-input-form" 
        className="input-note" 
        type="text" 
        name="newNote" 
        placeholder="Create a new todo..." />
  </form>
  )
}

export default NoteForm