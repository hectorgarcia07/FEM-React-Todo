import Note from './Note'
import TodoFilter from './TodoFilter'

const TodoList = ({ todoList, toggleChecked, deleteTodo, updateFilter, filter, clearCompleted }) => {
  const todosLeft = todoList.reduce((total, todo) => {
    if(!todo.checked){
      return total + 1
    }
    return total
  } , 0)
  return (
    <>
      <ul className="todo-list-container" id="node-list">
        { todoList.map( todoInfo => 
            <Note 
              key={todoInfo.id} 
              description={todoInfo.description} 
              id={todoInfo.id}
              checked={todoInfo.checked}
              toggleChecked={toggleChecked}
              deleteTodo={deleteTodo}
            />
          )
        }
      </ul>
      <TodoFilter 
        todosLeft={ todosLeft } 
        updateFilter={ updateFilter } 
        filter={filter}
        clearCompleted={clearCompleted}
       />
    </>
  )
}

export default TodoList