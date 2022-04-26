const TodoFilter = ({ todosLeft, updateFilter, filter, clearCompleted }) => {
  return (
    <>
      <div className="todo-node todo-detail-node mobile-info">
        <p className="todo-detail todo-num-items">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </p>
        <button 
          className="todo-detail todo-clear"
          onClick={clearCompleted}
        >Clear Compleated</button>
      </div>
      <div className="todo-node todo-filter">
        <p className="todo-detail desktop-items-left todo-num-items">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </p>
        <div className="todo-filter-container">
          <button 
            className={`todo-filter-option ${filter === 'all' ? 'active-option' : ''}`}
            id="todo-all"
            onClick={() => updateFilter('all')}
          >All</button> 
          <button 
            className={`todo-filter-option ${filter === 'active' ? 'active-option' : ''}`}
            id="todo-active"
            onClick={() => updateFilter('active')}
          >Active</button>
          <button 
            className={`todo-filter-option ${filter === 'completed' ? 'active-option' : ''}`}
            id="todo-complete"
            onClick={() => updateFilter('completed')}
          >Compleated</button>
        </div>
        <button 
          className="todo-detail todo-clear desktop-clear-todo"
          onClick={clearCompleted}
        >Clear Compleated</button>
      </div>
    </>
  )
}

export default TodoFilter