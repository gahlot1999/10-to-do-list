import { useEffect, useReducer, useState } from 'react';

const testData = [
  { id: 1, toDo: 'Buy groceries', completed: false },
  { id: 2, toDo: 'Clean the house', completed: true },
  { id: 3, toDo: 'Finish work project', completed: false },
  { id: 4, toDo: 'Exercise for 30 minutes', completed: true },
  { id: 5, toDo: 'Read a book', completed: false },
  { id: 6, toDo: 'Cook dinner', completed: false },
  { id: 7, toDo: 'Take the dog for a walk', completed: true },
  { id: 8, toDo: 'Call a friend', completed: false },
  { id: 9, toDo: 'Write a report', completed: false },
  { id: 10, toDo: 'Watch a movie', completed: true },
];

const initialState = {
  todos: [],
  filter: 'all',
};

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, todos: action.payload };

    case 'ADD-TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'DELETE-TODO':
      return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.payload),
      };

    case 'TOGGLE-TODO':
      return {
        ...state,
        todos: state.todos.map((el) =>
          el.id === action.payload ? { ...el, completed: !el.completed } : el,
        ),
      };

    case 'FILTER-COMPLETED': {
      return { ...state, filter: 'completed' };
    }

    case 'FILTER-PENDING': {
      return { ...state, filter: 'pending' };
    }

    case 'FILTER-ALL':
      return { ...state, filter: 'all' };
  }
}

function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toDo, setToDo] = useState('');

  const total = state.todos?.length;
  const completed = state.todos.filter((el) => el.completed === true)?.length;

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos?.length > 1) {
      dispatch({ type: 'INITIALIZE', payload: savedTodos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  function handleAddToDo(e) {
    e.preventDefault();
    if (!toDo || toDo === '' || toDo === ' ') return;

    const newToDo = {
      id: crypto.randomUUID(),
      toDo: toDo,
      completed: false,
    };

    dispatch({ type: 'ADD-TODO', payload: newToDo });
    setToDo('');
  }

  function handleDeleteToDo(id) {
    dispatch({ type: 'DELETE-TODO', payload: id });
  }

  function handleToggleToDo(id) {
    dispatch({ type: 'TOGGLE-TODO', payload: id });
  }

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <main>
      <header>
        <h1>To Do List</h1>
      </header>

      <form className='todo-add-form'>
        <input
          autoFocus
          type='text'
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
        />
        <button type='submit' onClick={handleAddToDo}>
          Add
        </button>
      </form>

      <div className='todo-list'>
        {filteredTodos.map((el) => (
          <div className='todo-list-item' key={el.id}>
            <input
              type='checkbox'
              checked={el.completed}
              onChange={() => handleToggleToDo(el.id)}
            />
            <p className={el.completed ? 'completed' : ''}>{el.toDo}</p>
            <button onClick={() => handleDeleteToDo(el.id)}>Delete</button>
          </div>
        ))}
      </div>

      <footer>
        <div className='summary'>
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
        </div>
        <div className='filter'>
          <p>Filter</p>
          <button
            className={state.filter === 'all' ? 'active' : ''}
            onClick={() => dispatch({ type: 'FILTER-ALL' })}
          >
            All
          </button>
          <button
            className={state.filter === 'completed' ? 'active' : ''}
            onClick={() => dispatch({ type: 'FILTER-COMPLETED' })}
          >
            Completed
          </button>
          <button
            className={state.filter === 'pending' ? 'active' : ''}
            onClick={() => dispatch({ type: 'FILTER-PENDING' })}
          >
            Pending
          </button>
        </div>
      </footer>
    </main>
  );
}

export default ToDoList;
