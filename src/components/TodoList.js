import Note from './Note'

import { Reorder } from "framer-motion"

const TodoList = ({ todoList, todoDispatch, handleReorder }) => {
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
        { todoList.map( todoInfo => 
          <Reorder.Item className="todo-node" key={todoInfo.id} value={todoInfo}>
            <Note 
              key={todoInfo.id}
              description={todoInfo.description} 
              id={todoInfo.id}
              checked={todoInfo.checked}
              todoDispatch={todoDispatch}
            />
          </Reorder.Item>)
        }
      </Reorder.Group>
    </>
  )
}

export default TodoList