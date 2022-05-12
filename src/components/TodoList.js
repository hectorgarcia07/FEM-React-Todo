import Note from './Note'

import { Reorder } from "framer-motion"

//Will be used to render all todo's 
const TodoList = ({ todoList, handleReorder }) => {
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
          <Reorder.Item 
            className="todo-node" 
            key={todoInfo.id} 
            value={todoInfo}
            onDragEnd={
              (event, info) => {
                console.log("event", event.target)
              }
            }
          >
            <Note 
              key={todoInfo.id}
              description={todoInfo.description} 
              id={todoInfo.id}
              checked={todoInfo.checked}
            />
          </Reorder.Item>)
        }
      </Reorder.Group>
    </>
  )
}

export default TodoList