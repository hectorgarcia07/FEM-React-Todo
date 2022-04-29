import TODO_ACTIONS from "../utils/todo-actions"

//will change the types of filters 'all', 'compleated', active'
//will also be able to clear all current completed todos
const TodoFilter = ({ todosLeft, filter, todoDispatch, setFilter }) => {
  return (
    <>
      <div className="todo-node todo-detail-node mobile-info">
        <p className="todo-detail todo-num-items">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </p>
        <button 
          className="todo-detail todo-clear"
          onClick={() => todoDispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED })}
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
            onClick={() => setFilter('all')}
          >All</button> 
          <button 
            className={`todo-filter-option ${filter === 'active' ? 'active-option' : ''}`}
            id="todo-active"
            onClick={() => setFilter('active')}
          >Active</button>
          <button 
            className={`todo-filter-option ${filter === 'completed' ? 'active-option' : ''}`}
            id="todo-complete"
            onClick={() => setFilter('completed')}
          >Compleated</button>
        </div>
        <button 
          className="todo-detail todo-clear desktop-clear-todo"
          onClick={() => todoDispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED })}
        >Clear Compleated</button>
      </div>
    </>
  )
}

export default TodoFilter