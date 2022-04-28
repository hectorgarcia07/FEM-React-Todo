import Note from './Note'

import { Reorder, AnimatePresence } from "framer-motion"
import TodoFilter from './TodoFilter'

const TodoList = ({ todoList, toggleChecked, deleteTodo, updateFilter, filter, clearCompleted, handleReorder }) => {
  const todosLeft = todoList.reduce((total, todo) => {
    if(!todo.checked){
      return total + 1
    }
    return total
  } , 0)


  return (
    <>
      <Reorder.Group 
        className="todo-list-container" 
        axis="y" 
        values={todoList} 
        onReorder={handleReorder}
        layoutScroll
        style={{ overflowY: "scroll" }}
      >
        <AnimatePresence>
          { todoList.map( todoInfo => 
            <Reorder.Item className="todo-node" key={todoInfo.id} value={todoInfo}
              initial={{ width: '0 0 0%' }}
              animate={{ width: '1 1 0%' }}
              exit={{ width: '0 0 0%' }}
            >
              <Note 
                key={todoInfo.id}
                description={todoInfo.description} 
                id={todoInfo.id}
                checked={todoInfo.checked}
                toggleChecked={toggleChecked}
                deleteTodo={deleteTodo}
                
              />
            </Reorder.Item>)
          }
        </AnimatePresence>
      </Reorder.Group>
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