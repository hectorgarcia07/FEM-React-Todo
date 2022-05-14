import { useDispatch, useSelector } from "react-redux"
import { clearCompleted, updateTodoFilter } from "../reducers/todoReducer"

//will change the types of filters 'all', 'compleated', active'
//will also be able to clear all current completed todos
const TodoFilter = () => {
  const dispatch = useDispatch()
  const filter = useSelector( state => state.todoList.filterType )
  const todosLeft = useSelector( ({todoList}) => {
    return todoList.todoList.reduce((total, todo) => {
      if(!todo.checked){
        return total + 1
      }
      return total
    } , 0)
  })

  return (
    <>
      <div className="todo-node todo-detail-node mobile-info">
        <p className="todo-detail todo-num-items">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </p>
        <button 
          className="todo-detail todo-clear"
          onClick={() => dispatch(clearCompleted()) }
        >Clear Compleated</button>
      </div>
      <div className="todo-node todo-filter">
        <p className="todo-detail desktop-items-left todo-num-items">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </p>
        <div className="todo-filter-container">
          <button 
            className={`todo-filter-option ${filter === 'ALL' ? 'active-option' : ''}`}
            id="todo-all"
            onClick={() => dispatch(updateTodoFilter('ALL')) }
          >All</button> 
          <button 
            className={`todo-filter-option ${filter === 'ACTIVE' ? 'active-option' : ''}`}
            id="todo-active"
            onClick={() => dispatch(updateTodoFilter('ACTIVE')) }
          >Active</button>
          <button 
            className={`todo-filter-option ${filter === 'COMPLETED' ? 'active-option' : ''}`}
            id="todo-complete"
            onClick={() => dispatch(updateTodoFilter('COMPLETED')) }
          >Compleated</button>
        </div>
        <button 
          className="todo-detail todo-clear desktop-clear-todo"
          onClick={() => dispatch(clearCompleted()) }
        >Clear Compleated</button>
      </div>
    </>
  )
}

export default TodoFilter