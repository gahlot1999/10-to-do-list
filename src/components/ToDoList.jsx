import { useReducer, useState } from 'react';

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

const initialState = [
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

function reducer(state, action) {
  switch (action.type) {
    case 'ADD-TODO':
      return [...state, action.payload];
    case 'DELETE-TODO':
      return state.filter((el) => el.id !== action.payload);
    case 'TOGGLE-TODO':
      return state.map((el) =>
        el.id === action.payload ? { ...el, completed: !el.completed } : el,
      );
  }
}

function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toDo, setToDo] = useState('');

  const total = state.length;
  const completed = state.filter((el) => el.completed === true).length;

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
        {state.map((el) => (
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
        <div className='sort'>
          <p>Sort by</p>
          <button>All</button>
          <button>Completed</button>
          <button>Yet to complete</button>
        </div>
      </footer>
    </main>
  );
}

export default ToDoList;
