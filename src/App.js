import './style.css'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import TodoList from './components/TodoList'
import TodoInfo from './components/TodoInfo'
import TodoFilter from './components/TodoFilter'

function App() {
  return (
    <main className="container">
      <div className='background-container'>
        <div className="header-container width-container">
          <Header />
          <NoteForm />
          <TodoList />
          <TodoInfo />
          <TodoFilter />
        </div>
        <p className="todo-info">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
