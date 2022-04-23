const TodoFilter = () => {
  return (
    <div className="todo-node todo-filter">
      <p className="todo-detail desktop-items-left todo-num-items"></p>
      <div className="todo-filter-container">
        <button className="todo-filter-option active-option" id="todo-all">All</button>
        <button className="todo-filter-option" id="todo-active">Active</button>
        <button className="todo-filter-option" id="todo-complete">Compleated</button>
      </div>
      <button className="todo-detail todo-clear desktop-clear-todo">Clear Compleated</button>
    </div>
  )
}

export default TodoFilter