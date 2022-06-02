import { useDispatch, useSelector } from "react-redux"
import { clearCompleted, updateTodoFilter } from "../reducers/todoReducer"
import { InfoContainer, TodoFilterContainer } from "../components/styles/Containers.styled"
import { TodosLeft } from "./styles/TodosLeft.styled"
import { TodoClear, TodoFilterBtn } from "./styles/Button.styled"

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
      <InfoContainer mobile >
        <TodosLeft className="todo-detail">
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </TodosLeft>
        <TodoClear 
          onClick={() => dispatch(clearCompleted()) }
        >Clear Compleated</TodoClear>
      </InfoContainer>
      <InfoContainer desktop >
        <TodosLeft desktop >
          {todosLeft} {todosLeft === 1 ? 'item' : 'items' } left
        </TodosLeft>
        <TodoFilterContainer >
          <TodoFilterBtn 
            className={`${filter === 'ALL' ? 'active-option' : ''}`}
            id="todo-all"
            onClick={() => dispatch(updateTodoFilter('ALL')) }
          >All</TodoFilterBtn> 
          <TodoFilterBtn 
            className={`${filter === 'ACTIVE' ? 'active-option' : ''}`}
            id="todo-active"
            onClick={() => dispatch(updateTodoFilter('ACTIVE')) }
          >Active</TodoFilterBtn>
          <TodoFilterBtn 
            className={`${filter === 'COMPLETED' ? 'active-option' : ''}`}
            id="todo-complete"
            onClick={() => dispatch(updateTodoFilter('COMPLETED')) }
          >Compleated</TodoFilterBtn>
        </TodoFilterContainer>
        <TodoClear
          desktop 
          onClick={() => dispatch(clearCompleted()) }
        >Clear Compleated</TodoClear>
      </InfoContainer>
    </>
  )
}

export default TodoFilter