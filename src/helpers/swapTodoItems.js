//will be used to determine what two items were swaped and will get their ids
export const swapTodoItems = (updatedTodoOrder, filteredTodo, todoList) => {
  let source_id, target_id = ''

  //compares each items from the todoList and updatedTodoOrder and will figure out which
  //two items were swapped. it will saved their id's.
  for(let i = 0, count = 0, length = filteredTodo.length; i < length && count < 2; i++){
    if(count === 0 && updatedTodoOrder[i].id !== filteredTodo[i].id){
      count++
      source_id = updatedTodoOrder[i].id
    }
    else if(count === 1 && updatedTodoOrder[i].id !== filteredTodo[i].id){
      count++
      target_id = updatedTodoOrder[i].id
    }
  }

  return swapAndUpdate({ source_id, target_id }, todoList)
}

//will be find the two obj in the TODO list that were swaped and swap them and 
  //updates their state
  function swapAndUpdate({ source_id, target_id }, todoList){
    console.log(todoList)
    
    const todoCopy = [...todoList]
    let index_one, index_two;
    let todo_obj_one, todo_obj_two
    
    //find the index of source_id and target_id to be used to know where to swap them
    index_one = todoCopy.findIndex( todo => todo.id === source_id )
    index_two = todoCopy.findIndex( todo => todo.id === target_id )

    //make a copy of the two todo objects 
    todo_obj_one = { ...todoList[index_one] }
    todo_obj_two = { ...todoList[index_two] }
   
    //swap both of the todo items
    todoCopy[index_one] = todo_obj_two
    todoCopy[index_two] = todo_obj_one
    
    return todoCopy
  }